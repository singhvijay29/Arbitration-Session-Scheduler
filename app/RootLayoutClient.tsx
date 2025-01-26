"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Navbar onOpenDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />
      <div className="flex flex-1 mt-[74px] h-[100vh] overflow-hidden">
        <Sidebar />
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <main className="flex-1 p-4 md:p-8 lg:ml-[250px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
