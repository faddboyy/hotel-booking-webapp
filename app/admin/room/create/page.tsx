import CreateRoomForm from "@/components/admin/room/CreateRoomForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new Room",
};

const CreateRoomPage = () => {
  return (
    <div className="max w-screen xl px-4 py-16 mt-10 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Create New Room
      </h1>
      <CreateRoomForm />
    </div>
  );
};

export default CreateRoomPage;
