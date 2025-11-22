"use client";

import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { deleteRoom } from "@/lib/action";
import Link from "next/link";

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const deleteRoomWithId = deleteRoom.bind(null, id, image);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Cegah submit default form dulu
    e.preventDefault();

    // Tampilkan konfirmasi
    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (confirmed) {
      // Submit form ke server action
      deleteRoomWithId();
    }
  };

  return (
    <form>
      <button
        type="submit"
        onClick={handleClick}
        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};

export const EditButton = ({id}: {id: string}) => {
    return (
      <Link href={`/admin/room/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-200">
        <IoPencil className="size-5"/>
      </Link>
    )
}