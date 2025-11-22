"use client";

import {
  useActionState,
  useEffect,
  useTransition,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";
import Image from "next/image";

import { saveRoom } from "@/lib/action";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";

type CreateRoomFormClientProps = {
  amenities: Amenities[];
};

const CreateFormClient = ({ amenities }: CreateRoomFormClientProps) => {
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setTransition] = useTransition();

  // Attach image ke server action
  const [state, formAction, isPending] = useActionState(
    saveRoom.bind(null, image),
    null
  );
  
  useEffect(() => {
    if (state?.success) {
      router.push(
        "/admin/room?success=1&message=" + encodeURIComponent(state.message)
      );
    }
  }, [state]);

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);

    setTransition(async () => {
      setMessage("");
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message || "Upload failed");
          return;
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.error(error);
        setMessage("Upload failed");
      }
    });
  };

  const deleteImage = (imgUrl: string) => {
    setTransition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${encodeURIComponent(imgUrl)}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        {/* Kolom Kiri */}
        <div className="col-span-8 bg-white p-4">
          {/* Room Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm mt-2 text-red-500">
                {state?.error?.name?.[0]}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea
              name="description"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              rows={8}
              placeholder="Description"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm mt-2 text-red-500">
                {state?.error?.description?.[0]}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              {amenities.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    defaultValue={item.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm mt-2 text-red-500">
                {state?.error?.amenities?.[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="col-span-8 md:col-span-4 bg-white p-4">
          {/* File Upload */}
          <label
            htmlFor="input-file"
            className={clsx(
              "flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative",
              { "border-red-300": message || state?.error?.image }
            )}
          >
            <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
              {pending ? <BarLoader /> : null}
              {image ? (
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-400"
                >
                  <IoTrashOutline className="size-7 text-gray-200 group-hover:text-white" />
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="size-8" />
                  <p className="mb-1 text-sm font-bold">Select Image</p>
                  <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm mt-2 text-red-500">
                      {message || state?.error?.image?.[0]}
                    </span>
                  </div>
                  {!message && !state?.error?.image && (
                    <p className="text-xs">
                      SVG, PNG, JPG, GIF, or Others (Max: 4mb, Size: 16:9)
                    </p>
                  )}
                </div>
              )}
            </div>
            {!image && (
              <input
                type="file"
                className="hidden"
                id="input-file"
                ref={inputFileRef}
                onChange={handleUpload}
              />
            )}
            {image && (
              <Image
                src={image}
                alt="Room Image"
                width={640}
                height={360}
                className="rounded-md absolute aspect-video object-cover"
                unoptimized
              />
            )}
          </label>

          {/* Capacity */}
          <div className="mb-4">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm mt-2 text-red-500">
                {state?.error?.capacity?.[0]}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm mt-2 text-red-500">
                {state?.error?.price?.[0]}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              "bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer",
              {
                "opacity-50 cursor-progress": isPending,
              }
            )}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateFormClient;
