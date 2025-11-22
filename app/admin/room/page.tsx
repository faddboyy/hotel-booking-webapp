import Link from "next/link";
import { Suspense } from "react";
import RoomTable from "@/components/admin/room/RoomTable";
import AlertSuccess from "@/components/admin/room/AlertSuccess";

export default async function ManageRoomPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const success = params?.success;
  const message = params?.message;

  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Room List</h1>

        <Link
          href="/admin/room/create"
          className="bg-orange-500 px-6 py-2.5 text-white font-semibold rounded hover:bg-orange-600 transition"
        >
          Create New
        </Link>
      </div>

      {/* 🔥 Alert Success sebagai Client Component */}
      {success && message && <AlertSuccess message={message} />}

      <Suspense fallback={<p>Loading Data...</p>}>
        <RoomTable />
      </Suspense>
    </div>
  );
}
