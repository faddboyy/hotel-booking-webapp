import HeaderSection from "@/components/about/HeaderSection";
import RoomLists from "@/components/skeletons/RoomLists";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Lists",
  description: "Choose your best room today",
};

const RoomPage = async () => {
  const rooms = await prisma.room.findMany();
  return (
    <div>
      <HeaderSection
        title={"Rooms & Rates"}
        subtitle={"Find the perfect room that suits your comfort and needs."}
      />
      <div className="mt-10">
        <Suspense fallback={<RoomSkeleton count={rooms.length} />}>
          <RoomLists />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
