import { getAmenities, getRoomById } from "@/lib/data";
import EditFormClient from "./EditFormClient";
import { notFound } from "next/navigation";

// 1. Ini sekarang adalah Server Component (async, tanpa "use client")
const EditRoomForm = async ({ roomId }: { roomId: string }) => {
  // 2. Pengambilan data terjadi di server
  const [amenities, room] = await Promise.all([
    getAmenities(),
    getRoomById(roomId),
  ]);

  // 3. Menangani jika data tidak ada
  if (!amenities || !room) {
    return notFound();
  }

  return <EditFormClient amenities={amenities} room={room} />;
};

export default EditRoomForm;
