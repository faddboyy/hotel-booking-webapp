import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorize Access");

  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: {
          include: {
            amenities: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payment: true,
      },
    });

    if (!reservation) return null;

    // Kode ini sudah bagus, memastikan 'startDate' dan 'endDate' adalah objek Date.
    return {
      ...reservation,
      startDate: new Date(reservation.startDate),
      endDate: new Date(reservation.endDate),
    };
  } catch (error) {
    console.error("[getReservationById] Error:", error);
    throw new Error("Failed to fetch reservation.");
  }
};

export const getDisabledRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        startDate: true,
        endDate: true,
        payment: {
          select: {
            status: true,
          },
        },
      },
      where: {
        roomId,
        // payment yang valid untuk disable tanggal
        payment: {
          status: {
            in: ["pending", "paid"], // yang dianggap booked
          },
        },
      },
      orderBy: { startDate: "asc" },
    });

    return result.map((r) => {
      // pastikan endDate dikurangi 1 hari (karena checkout = tidak tinggal)
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      end.setDate(end.getDate() - 1);

      return { startDate: start, endDate: end };
    });
  } catch (error) {
    console.error("getDisabledRoomById error:", error);
    return [];
  }
};

export const getReservationByUserId = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorize Access");
  }
  try {
    const result = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRevenueAndReserve = async () => {
  try {
    const result = await prisma.reservation.aggregate({
      _count: true,
      _sum: { price: true },
      where: {
        payment: { status: { not: "failure" } },
      },
    });
    return {
      revenue: result._sum.price || 0,
      reserve: result._count,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCustomer = async () => {
  try {
    const result = await prisma.reservation.findMany({
      distinct: ["userId"],
      where: {
        payment: { status: { not: "failure" } },
      },
      select: { userId: true },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservations = async () => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    session.user.role != "admin"
  ) {
    throw new Error("Unauthorized Access");
  }
  try {
    const result = await prisma.reservation.findMany({
      include: {
        room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
