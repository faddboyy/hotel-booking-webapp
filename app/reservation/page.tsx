import { auth } from "@/auth";
import MyReserveList from "@/components/room/MyReserveList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Reservation",
};

const ReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/signin");

  return (
    <div className="min-h-screen bg-slate-50 mt-8">
      <div className="max-w-screen-lg mx-auto py-20 px-4">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Reservation
          </h1>

          <h3 className="text-lg text-gray-700 mt-4">
            Hi, <span className="font-semibold">{session.user.name}</span>
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Here’s your booking history and ongoing reservations.
          </p>
        </div>

        {/* Reservation List */}
        <div className="rounded-sm">
          <Suspense fallback={<p>Loading...</p>}>
            <MyReserveList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
