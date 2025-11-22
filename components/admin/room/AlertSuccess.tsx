"use client";

import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function AlertSuccess({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mb-6 flex items-center justify-between bg-green-400 text-white px-4 py-3 rounded shadow">
      <span>{message}</span>

      <button
        onClick={() => setVisible(false)}
        className="ml-4 hover:bg-green-600 p-1 rounded"
      >
        <IoClose className="text-white size-6" />
      </button>
    </div>
  );
}
