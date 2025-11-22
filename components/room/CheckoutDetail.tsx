import { getReservationById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import PaymentButton from "./PaymentButton";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReservationById(reservationId);

  if (!reservation || !reservation.payment) {
    return <h1>No Reservation Found</h1>;
  }

  const duration = differenceInCalendarDays(
    reservation.endDate,
    reservation.startDate
  );

  return (
    <div className="grid md:grid-cols-2 gap-5 order-2">
      {/* ================= LEFT SIDE: RESERVATION DETAIL ================= */}
      <div className="bg-white border border-gray-200 px-4 py-5 rounded-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>
            <tr>
              <td className="py-2">Name</td>
              <td className="py-2 text-right truncate">
                {reservation.user.name}
              </td>
            </tr>
            <tr>
              <td className="py-2">Email</td>
              <td className="py-2 text-right truncate">
                {reservation.user.email}
              </td>
            </tr>
            <tr>
              <td className="py-2">Phone Number</td>
              <td className="py-2 text-right truncate">
                {reservation.user.phone}
              </td>
            </tr>
            <tr>
              <td className="py-2">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.startDate.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.endDate.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2">Duration</td>
              <td className="py-2 text-right truncate">
                {duration} {duration <= 1 ? "Night" : "Nights"}
              </td>
            </tr>
            <tr>
              <td className="py-2">Amount in IDR</td>
              <td className="py-2 text-right truncate">
                {formatCurrency(reservation.payment.amount)}
              </td>
            </tr>
            <tr>
              <td className="py-2">Status</td>
              <td className="py-2 text-right font-semibold">
                <span
                  className={
                    reservation.payment.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {reservation.payment.status}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= RIGHT SIDE: IMAGE + ROOM INFO + BUTTON ================= */}
      <div className="flex flex-col bg-white border border-gray-200 rounded-sm">
        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={reservation.room.image}
            width={500}
            height={300}
            className="object-cover w-full aspect-video rounded-t-sm"
            alt={reservation.room.name}
            unoptimized
          />
        </div>

        {/* Name + Price */}
        <div className="p-4 flex flex-col gap-2">
          <h5 className="text-4xl font-bold text-gray-900">
            {reservation.room.name}
          </h5>

          <div className="flex items-center gap-1 text-2xl text-gray-700">
            <span>{formatCurrency(reservation.room.price)}</span>
            <span>/ Night</span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="px-4 pb-4">
          {reservation.payment.status === "unpaid" && (
            <PaymentButton reservation={reservation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;
