"use client";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Menu umum (selalu tampil)
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const privateLinks = [{ label: "My Reservation", href: "/reservation" }];

  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Manage Room", href: "/admin/room" },
  ];

  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              src={session.user.image || "/avatar.svg"}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full size-8"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="md:block hidden py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
      <button
        className="inline-flex items-center justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      <div
        className={clsx(
          "absolute top-full left-0 w-full bg-white shadow-md md:static md:shadow-none md:w-auto md:block",
          !open && "hidden md:block"
        )}
      >
        <ul className="flex flex-col md:flex-row font-semibold text-sm uppercase p-4 md:py-4 md:space-x-10 lg:items-center">
          {/* Public Menu */}
          {publicLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "relative block py-2 px-3 text-gray-800 rounded-sm md:p-0",
                  "hover:bg-gray-100 md:hover:bg-transparent"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Private Menu (hanya jika login) */}
          {session &&
            privateLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative block py-2 px-3 text-gray-800 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  {link.label}
                </Link>
              </li>
            ))}

          {/* ADMIN ONLY */}
          {session?.user.role == "admin" &&
            adminLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative block py-2 px-3 text-gray-800 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  {link.label}
                </Link>
              </li>
            ))}

          {/* Auth button */}
          <li className="pt-2 md:pt-0">
            {!session ? (
              <Link
                href="/signin"
                className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={() => signOut()}
                className="py-2.5 px-6 bg-red-500 text-white hover:bg-red-600 rounded-sm lg:hidden"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navlink;
