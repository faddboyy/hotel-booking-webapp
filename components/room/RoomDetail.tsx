import { getDisabledRoomById, getRoomDetailById } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import ReserveForm from "./ReserveForm";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
  const [room, disabledDate] = await Promise.all([
    getRoomDetailById(roomId),
    getDisabledRoomById(roomId),
  ]);
  if (!room || !disabledDate) return notFound();

  return (
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 lg:gap-12 mx-auto">
      {/* Kolom Konten Utama (8 kolom) */}
      <div className="lg:col-span-8">
        <Image
          src={room.image}
          alt={room.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-lg mb-8 shadow-lg" // Rounded lebih besar & shadow
          unoptimized
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          {room.name}
        </h1>

        <p className="text-gray-700 leading-relaxed mb-8">{room.description}</p>

        <hr className="my-8" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
          {room.RoomAmenities.map((item) => (
            <div className="flex items-center gap-3 py-1" key={item.id}>
              <IoCheckmark className="size-5 text-green-600 shrink-0" />
              <span className="text-gray-700">{item.amenities.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Sidebar (4 kolom) */}
      <div className="lg:col-span-4">
        {/* Box Info Harga & CTA */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-6">
            {/* Kapasitas */}
            <div className="flex items-center space-x-2">
              <IoPeopleOutline className="size-5 text-gray-600" />
              <span className="font-medium text-gray-800">
                {room.capacity}
                {room.capacity == 1 ? " Person" : " People"}
              </span>
            </div>

            {/* Harga */}
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(room.price)}
              </span>
              <span className="text-sm text-gray-500">/Night</span>
            </div>
          </div>

          <ReserveForm room={room} disabledDate={disabledDate}/>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
