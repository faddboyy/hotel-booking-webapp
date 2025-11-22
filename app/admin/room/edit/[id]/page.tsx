import EditRoomForm from "@/components/admin/room/EditRoomForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Room",
};


const UpadateRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <EditRoomForm roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default UpadateRoomPage;
