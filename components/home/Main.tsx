// components/home/Main.tsx
import { getRooms } from "@/lib/data";
import Card from "./Card";
import { notFound } from "next/navigation";

const Main = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();

  // Batasi hanya 9 untuk Home
  const limitedRooms = rooms.slice(0, 3);

  return (
    <div className="py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {limitedRooms.map((room) => (
          <Card key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Main;
