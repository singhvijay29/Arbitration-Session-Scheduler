import { Menu } from "lucide-react";
import Link from "next/link";
import { useRole } from "../../context/RoleContext";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  onOpenDrawer: () => void;
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const { role, setRole } = useRole();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] h-[74px] bg-white shadow-sm py-4 px-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold">
          Arbitration Scheduler
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {role === "user" && (
          <div className="hidden md:flex gap-2">
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
          </div>
        )}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setRole("arbitrator")}
            className={`px-2 md:px-4 py-1 md:py-2 rounded-md transition-all ${
              role === "arbitrator"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Arbitrator
          </button>
          <button
            onClick={() => setRole("user")}
            className={`px-2 md:px-4 py-1 md:py-2 rounded-md transition-all ${
              role === "user"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            User
          </button>
        </div>
        <button
          onClick={onOpenDrawer}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
