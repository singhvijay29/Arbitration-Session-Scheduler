"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden lg:block w-64 bg-white p-6 shadow-sm fixed h-[100vh] z-[998] top-0 left-0 bottom-0 mt-[70px]">
      <nav className="space-y-4">
        <div
          onClick={() => router?.push("/")}
          className={`block py-2 px-4 rounded-lg cursor-pointer ${
            isActive("/")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Calendar
        </div>
        <div
          onClick={() => router?.push("/schedule")}
          className={`block py-2 px-4 rounded-lg cursor-pointer ${
            isActive("/schedule")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Schedule Session
        </div>
        <div
          onClick={() => router?.push("/manage")}
          className={`block py-2 px-4 rounded-lg cursor-pointer ${
            isActive("/manage")
              ? "bg-gray-100 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Booking Management
        </div>
      </nav>
    </div>
  );
}
