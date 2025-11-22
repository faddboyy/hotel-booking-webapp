"use server";

import { ContactSchema, ReserveSchema, RoomSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";
import z from "zod";

// ==============================
// CONTACT MESSAGE
// ==============================
export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: { name, email, subject, message },
    });

    redirect(
      "/contact?success=1&message=" +
        encodeURIComponent("Thanks for contacting us")
    );
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send message." };
  }
};

// ==============================
// SAVE ROOM
// ==============================
export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { success: false, message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } =
    validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        price: Number(price),
        capacity: Number(capacity),
        image,
        RoomAmenities: {
          createMany: {
            data: amenities.map((amenityId) => ({
              amenitiesId: amenityId as string,
            })),
          },
        },
      },
    });

    return {
      success: true,
      message: "Room saved successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to save room." };
  }
};

// ==============================
// DELETE ROOM
// ==============================
export const deleteRoom = async (id: string, image: string) => {
  try {
    // Delete blob first
    if (image) {
      await del(image);
    }

    // Delete room
    await prisma.room.delete({ where: { id } });

    revalidatePath("/admin/room");

    redirect(
      "/admin/room?success=1&message=" +
        encodeURIComponent("Room deleted successfully!")
    );
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to delete room." };
  }
};

// ==============================
// UPDATE ROOM
// ==============================
export const updateRoom = async (
  roomId: string,
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { success: false, message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } =
    validatedFields.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price: Number(price),
          capacity: Number(capacity),
        },
      });

      await tx.roomAmenities.deleteMany({ where: { roomId } });

      await tx.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item as string,
        })),
      });
    });

    // ⛔ Jangan redirect di sini
    return {
      success: true,
      message: "Room updated successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update room." };
  }
};



// FIX 2: Ubah signature fungsi. Hanya terima 'prevState' dan 'formData'
export const createReserve = async (prevState: unknown, formData: FormData) => {
  // Ambil roomId SEKARANG untuk jaga-jaga jika perlu redirect ke signin
  const roomIdForRedirect = formData.get("roomId") as string | null;

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect(`/signin?redirect_url=room/${roomIdForRedirect || ""}`);
  }

  // FIX 3: Ubah FormData menjadi objek biasa
  const rawData = Object.fromEntries(formData.entries());

  // FIX 4: Validasi objek data yang LENGKAP
  const validatedFields = ReserveSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // FIX 5: Destructure data dari 'validatedFields.data', BUKAN dari argumen
  const { name, phone, roomId, roomPrice, startDate, endDate } =
    validatedFields.data;

  // --- Logika bisnis Anda (sekarang sudah benar) ---
  const night = differenceInCalendarDays(endDate, startDate);

  if (night <= 0) {
    return { messageDate: "Date must be at least 1 night" };
  }

  const total = night * roomPrice; // Gunakan 'roomPrice' dari data tervalidasi

  let reservationId;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name, // 'name' dari data tervalidasi
          phone, // 'phone' dari data tervalidasi
        },
        where: {
          id: session.user.id,
        },
      });
      const reservation = await tx.reservation.create({
        data: {
          startDate, // 'startDate' dari data tervalidasi
          endDate, // 'endDate' dari data tervalidasi
          price: roomPrice, // 'roomPrice' dari data tervalidasi
          roomId, // 'roomId' dari data tervalidasi
          userId: session.user.id as string,
          payment: {
            create: {
              amount: total,
            },
          },
        },
      });
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
    // FIX 6: Kembalikan pesan error, JANGAN redirect jika gagal
    return {
      message: "Failed to create reservation. Database error.",
    };
  }

  // FIX 7: Hanya redirect JIKA transaksi berhasil
  redirect(`/checkout/${reservationId}`);
};
