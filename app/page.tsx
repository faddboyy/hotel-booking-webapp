import Hero from "@/components/home/Hero";
import Main from "@/components/home/Main";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rat</h1>
          <p className="py-3">
            Enjoy a selection of our finest rooms, complete with comfortable
            amenities and friendly prices to suit all your accommodation needs.
          </p>
        </div>

        {/* Daftar Room */}
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>

        {/* Button di kanan bawah setelah MAIN */}
        <div className="flex justify-end">
          <Link
            href="/room"
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-semibold
              px-5
              py-3
              rounded-full
              shadow
              transition
              duration-200
            "
          >
            See All Rooms →
          </Link>
        </div>
        <Location />
      </div>
    </div>
  );
}
