"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden lg:block w-64 bg-white p-6 shadow-sm fixed h-[100vh] z-[998] top-0 left-0 bottom-0 mt-[70px]">
      <nav className="space-y-4">
        <Link
          href="/"
          className={`block py-2 px-4 rounded-lg ${
            isActive("/")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Calendar
        </Link>
        <Link
          href="/schedule"
          className={`block py-2 px-4 rounded-lg ${
            isActive("/schedule")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Schedule Session
        </Link>
        <Link
          href="/manage"
          className={`block py-2 px-4 rounded-lg ${
            isActive("/manage")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Booking Management
        </Link>
      </nav>
    </div>
  );
}
