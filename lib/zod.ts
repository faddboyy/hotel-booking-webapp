import z, { array, coerce, object, string } from "zod";

export const ContactSchema = object({
  name: string().min(6, "Name at least 6 characters"),
  email: string()
    .min(6, "Email at least 6 characters")
    .email("Please enter a valid email"),
  subject: string().min(6, "Subject at least 6 characters"),
  message: string()
    .min(12, "Message at least 12 characters")
    .max(200, "Message maximum 200 characters"),
});

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

// FIX 1: Skema validasi HARUS membaca SEMUA data dari formData
export const ReserveSchema = z.object({
  name: z.string().min(3, "Name is required (min 3 chars)"),
  phone: z.string().min(10, "Valid phone number is required (min 10 chars)"),
  // Tambahkan validasi untuk hidden input
  roomId: z.string(),
  roomPrice: z.coerce.number().min(1), // 'coerce' mengubah string form menjadi angka
  startDate: z.coerce.date(), // 'coerce' mengubah string ISO (dari hidden input) menjadi objek Date
  endDate: z.coerce.date(),
});
