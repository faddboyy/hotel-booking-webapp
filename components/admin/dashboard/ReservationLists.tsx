import { getReservations, getRooms } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";

const ReservationLists = async () => {
  const reservations = await getReservations();
  if (!reservations) return <p>No Reservation Found</p>;

  return (
    <table className="w-full border-collapse divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 w-32 text-left text-sm font-semibold text-gray-700 uppercase">
            Image
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Arival
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Departure
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
            Amount
          </th>
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase text-center">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {reservations.map((reserve) => (
          <tr className="hover:bg-gray-100 transition-colors" key={reserve.id}>
            <td className="px-6 py-4">
              <div className="h-20 w-32 relative">
                <Image
                  src={reserve.room.image}
                  fill
                  sizes="20vw"
                  alt="Room Image"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </td>
            <td className="px-6 py-4">{reserve.user.name}</td>
            <td className="px-6 py-4">
              {formatDate(reserve.startDate.toISOString())}
            </td>
            <td className="px-6 py-4">
              {formatDate(reserve.endDate.toISOString())}
            </td>
            <td className="px-6 py-4">
              {formatCurrency(reserve.payment?.amount)}
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-1">
                {reserve.payment?.status}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationLists;
