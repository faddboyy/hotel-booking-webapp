"use client";

import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";
import Image from "next/image";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { updateRoom } from "@/lib/action";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";
import { RoomProps } from "@/types/rooms";
import { useRouter } from "next/navigation";

type EditFormClientProps = {
  amenities: Amenities[];
  room: RoomProps;
};

const EditFormClient = ({ amenities, room }: EditFormClientProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [isUploading, startUpload] = useTransition();

  // Upload Image
  const handleUpload = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);

    startUpload(async () => {
      setMessage("");
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Upload failed");
          return;
        }

        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (err) {
        console.error(err);
        setMessage("Upload failed");
      }
    });
  };

  // Delete Image
  const deleteImage = (url: string) => {
    startUpload(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${encodeURIComponent(url)}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (err) {
        console.error(err);
      }
    });
  };

  // Form Action
  const [state, formAction, isPending] = useActionState(
    updateRoom.bind(null, room.id, image),
    null
  );

  const checkedAmenities = room.RoomAmenities.map((a) => a.amenitiesId);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push(
        "/admin/room?success=1&message=" + encodeURIComponent(state.message)
      );
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="col-span-8 bg-white p-4">
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              defaultValue={room.name}
            />
            <p className="text-sm mt-2 text-red-500">
              {state?.error?.name?.[0]}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea
              name="description"
              rows={8}
              placeholder="Description"
              defaultValue={room.description}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <p className="text-sm mt-2 text-red-500">
              {state?.error?.description?.[0]}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              {amenities.map((item) => (
                <label key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="amenities"
                    defaultValue={item.id}
                    defaultChecked={checkedAmenities.includes(item.id)}
                    className="w-4 h-4 border-gray-400"
                  />
                  <span className="capitalize">{item.name}</span>
                </label>
              ))}
            </div>
            <p className="text-sm mt-2 text-red-500">
              {state?.error?.amenities?.[0]}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-8 md:col-span-4 bg-white p-4">
          {/* Upload Box */}
          <label
            htmlFor={image ? undefined : "input-file"}
            className={clsx(
              "flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-md relative cursor-pointer bg-gray-50"
            )}
          >
            {/* Loading */}
            {isUploading && <BarLoader className="absolute top-4" />}

            {/* Image Preview */}
            {image ? (
              <>
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="absolute top-1 right-1 bg-black/40 rounded-sm p-1"
                >
                  <IoTrashOutline className="text-white size-6" />
                </button>

                <Image
                  src={image}
                  alt="Room Image"
                  fill
                  className="object-cover rounded-md"
                  unoptimized
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <IoCloudUploadOutline className="size-8" />
                <p className="font-semibold">Select Image</p>

                {/* error/message — safe access and supports string or string[] */}
                <p className="text-sm text-red-500">
                  {message ||
                    ((): string | null => {
                      const imgErr = (state as any)?.error?.image;
                      if (!imgErr) return null;
                      if (Array.isArray(imgErr)) return imgErr[0] ?? null;
                      if (typeof imgErr === "string") return imgErr;
                      // fallback: try to stringify if it's an object
                      try {
                        return String(imgErr);
                      } catch {
                        return null;
                      }
                    })()}
                </p>

                {/* hint only when no message and no image error */}
                {!message && !(state as any)?.error?.image && (
                  <p className="text-xs">
                    PNG, JPG, GIF (Max 4mb • Aspect 16:9)
                  </p>
                )}
              </div>
            )}

            {/* file input (only needed when there's no image) */}
            {!image && (
              <input
                type="file"
                id="input-file"
                className="hidden"
                ref={inputFileRef}
                onChange={handleUpload}
              />
            )}
          </label>

          {/* Capacity */}
          <div className="mb-4 mt-4">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              defaultValue={room.capacity}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <p className="text-sm mt-2 text-red-500">
              {state?.error?.capacity?.[0]}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              defaultValue={room.price}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            <p className="text-sm mt-2 text-red-500">
              {state?.error?.price?.[0]}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className={clsx(
              "bg-orange-400 text-white w-full py-2.5 text-lg font-semibold hover:bg-orange-500",
              { "opacity-50 cursor-progress": isPending }
            )}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditFormClient;
