import { getReservationById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { notFound } from "next/navigation";
import React from "react";

const ReservationDetail = async ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation) return notFound();

  return (
    <div className="w-full p-8 bg-white border border-gray-200 rounded-md shadow text-base">
      {/* Top Info */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left */}
        <ul className="space-y-4">
          <InfoRow label="Reservation ID" value={`#${reservation.id}`} />
          <InfoRow
            label="Book Date"
            value={formatDate(reservation.createdAt.toISOString())}
          />
          <InfoRow label="Name" value={`${reservation.user.name}`} />
          <InfoRow label="Email" value={`${reservation.user.email}`} />
        </ul>

        {/* Right */}
        <ul className="space-y-4">
          <InfoRow label="Phone" value={`${reservation.user.phone}`} />
          <InfoRow
            label="Payment Method"
            value={
              reservation.payment?.method
                ? reservation.payment.method.replace("_", " ")
                : "-"
            }
          />
          <InfoRow
            label="Payment Status"
            value={reservation.payment?.status || "-"}
          />
        </ul>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-12">
        <table className="w-full text-base text-gray-700 border rounded-md overflow-hidden">
          <thead className="uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-8 py-4 text-left">Room</th>
              <th className="px-8 py-4 text-left">Arrival</th>
              <th className="px-8 py-4 text-left">Departure</th>
              <th className="px-8 py-4 text-left">Duration</th>
              <th className="px-8 py-4 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b">
              <td className="px-8 py-6">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">
                    {reservation.room.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatCurrency(reservation.room.price)} / Night
                  </span>
                </div>
              </td>

              <td className="px-8 py-6">
                {formatDate(reservation.startDate.toISOString())}
              </td>

              <td className="px-8 py-6">
                {formatDate(reservation.endDate.toISOString())}
              </td>

              <td className="px-8 py-6">
                {differenceInCalendarDays(
                  reservation.endDate,
                  reservation.startDate
                )}{" "}
                Night
              </td>

              <td className="px-8 py-6 text-right font-semibold">
                {reservation.payment &&
                  formatCurrency(reservation.payment.amount)}
              </td>
            </tr>
          </tbody>

          <tfoot className="bg-gray-50 border-t">
            <tr>
              <td className="px-8 py-4 font-bold" colSpan={2}>
                Total:
              </td>
              <td className="px-8 py-4 text-right font-bold" colSpan={3}>
                {reservation.payment &&
                  formatCurrency(reservation.payment.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReservationDetail;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <li className="flex justify-between py-1">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </li>
);
