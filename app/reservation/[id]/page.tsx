import ReservationDetail from "@/components/room/ReservationDetail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Detail",
};

const ReservationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
