import { getReservationByUserId } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const MyReserveList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound();

  return (
    <div className="space-y-6">
      {reservation.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow rounded-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
            <h1 className="text-base font-medium text-gray-900 truncate">
              Reservation ID: #{item.id}
            </h1>

            <div className="text-base flex items-center gap-1">
              <span>Status:</span>
              <span className="font-bold uppercase">
                {item.payment?.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <Image
              src={item.room.image}
              alt="Room Image"
              width={500}
              height={300}
              unoptimized
              className="object-cover w-full h-56 md:h-auto md:w-1/3"
            />

            {/* Detail */}
            <div className="w-full p-4 text-gray-700 space-y-2">
              <DetailRow label="Price" value={formatCurrency(item.price)} />
              <DetailRow
                label="Arrival"
                value={formatDate(item.startDate.toISOString())}
              />
              <DetailRow
                label="Departure"
                value={formatDate(item.endDate.toISOString())}
              />
              <DetailRow
                label="Duration"
                value={`${differenceInCalendarDays(
                  item.endDate,
                  item.startDate
                )} Days`}
              />
              <DetailRow
                label="Subtotal"
                value={
                  item.payment ? formatCurrency(item.payment.amount) : "-"
                }
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-end px-4 py-3 bg-gray-50">
            {item.payment?.status === "unpaid" ? (
              <Link
                href={`/checkout/${item.id}`}
                className="px-6 py-1 bg-orange-400 rounded-md hover:bg-orange-500 text-white"
              >
                Pay Now
              </Link>
            ) : (
              <Link
                href={`/reservation/${item.id}`}
                className="px-6 py-1 bg-orange-400 rounded-md hover:bg-orange-500 text-white"
              >
                View Detail
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReserveList;

/* ----------------------- */
/*  Small reusable component */
/* ----------------------- */
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="flex items-center justify-between font-medium text-base">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
