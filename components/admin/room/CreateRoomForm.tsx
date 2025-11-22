// file: @/components/admin/room/CreateRoomForm.tsx
import { getAmenities } from "@/lib/data";
import CreateFormClient from "@/components/admin/room/CreateFormClient"; 

// 1. Ini sekarang adalah Server Component (async, tanpa "use client")
const CreateRoomForm = async () => {
  // 2. Pengambilan data terjadi di server
  const amenities = await getAmenities();

  // 3. Menangani jika data tidak ada
  if (!amenities) {
    return <p>Gagal memuat fasilitas. Coba lagi nanti.</p>;
  }

  // 4. Render Client Component dan teruskan 'amenities' sebagai prop
  return <CreateFormClient amenities={amenities} />;
};

export default CreateRoomForm;
