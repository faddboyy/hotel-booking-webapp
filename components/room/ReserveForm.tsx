"use client";

import { createReserve } from "@/lib/action";
import { DisabledDateProps, RoomDetailProps } from "@/types/rooms";
import clsx from "clsx";
import React, { useState, useActionState } from "react"; // FIX 1: Impor useActionState
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReserveForm = ({
  room,
  disabledDate,
}: {
  room: RoomDetailProps;
  disabledDate: DisabledDateProps[];
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [state, formAction, isPending] = useActionState(createReserve, null);

  const excludeDates = disabledDate.map((item) => {
    const start = new Date(item.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(item.endDate);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  });

  return (
    <div className="mt-8">
      {/* FIX 4: Gunakan 'action={formAction}' BUKAN 'onSubmit={handleSubmit}' */}
      <form action={formAction}>
        {/*
          FIX 5: Tambahkan hidden input untuk mengirim data
          yang tidak ada di input standar (seperti ID, harga, dan tanggal).
          Server Action akan membaca data ini dari FormData.
        */}
        <input type="hidden" name="roomId" value={room.id} />
        <input type="hidden" name="roomPrice" value={room.price} />
        {/* Kirim tanggal sebagai string ISO agar mudah diparsing di server */}
        {startDate && (
          <input
            type="hidden"
            name="startDate"
            value={startDate.toISOString()}
          />
        )}
        {endDate && (
          <input type="hidden" name="endDate" value={endDate.toISOString()} />
        )}

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Arrival - Departure
          </label>
          <DatePicker
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            excludeDateIntervals={excludeDates}
            minDate={new Date()}
            selectsRange
            dateFormat={"dd/MM/yyyy"}
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholderText="Select your check-in and check-out dates"
          />
          <div aria-live="polite" aria-atomic="true">
            {/* Tampilkan pesan error terkait tanggal dari server */}
            <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Name
          </label>
          <input
            type="text"
            name="name" // Atribut 'name' sangat penting untuk FormData
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholder="Full Name"
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            name="phone" // Atribut 'name' sangat penting untuk FormData
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholder="Phone Number"
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500",
            {
              "opacity-50 cursor-progress": isPending,
            }
          )}
        >
          {isPending ? "Loading..." : "Reserve"}
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
