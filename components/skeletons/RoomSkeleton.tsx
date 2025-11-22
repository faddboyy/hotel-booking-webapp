import CardSkeleton from "./CardSkeleton";

const RoomSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {Array.from({ length: count }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default RoomSkeleton;
