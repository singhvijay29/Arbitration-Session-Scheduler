import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-10 px-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg float-right"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/"
            className={`block py-2 px-4 rounded-lg ${
              isActive("/")
                ? "bg-gray-100 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
          >
            Booking Management
          </Link>
        </nav>
      </div>
    </>
  );
}
