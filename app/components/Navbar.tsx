import { Menu } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenDrawer: () => void;
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] h-[74px] bg-white shadow-sm py-4 px-3 md:px-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">
        Arbitration Scheduler
      </Link>
      <button
        onClick={onOpenDrawer}
        className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}
