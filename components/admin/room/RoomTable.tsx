import { getRooms } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "./Button";

const RoomTable = async () => {
  const rooms = await getRooms();
  if (!rooms?.length) return <p>No Room Found</p>;
  return (
    <table className="w-full border-collapse divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 w-32 text-left text-sm font-semibold text-gray-700 uppercase">
            Image
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Room Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Price
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Created At
          </th>
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {rooms.map((room) => (
          <tr className="hover:bg-gray-100 transition-colors" key={room.id}>
            <td className="px-6 py-4">
              <div className="h-20 w-32 relative">
                <Image
                  src={room.image}
                  fill
                  sizes="20vw"
                  alt="Room Image"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </td>
            <td className="px-6 py-4">{room.name}</td>
            <td className="px-6 py-4">{formatCurrency(room.price)}</td>
            <td className="px-6 py-4">
              {formatDate(room.createdAt.toString())}
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <EditButton id={room.id} />
                <DeleteButton id={room.id} image={room.image} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;
