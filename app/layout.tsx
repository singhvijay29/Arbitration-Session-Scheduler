import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SchedulerProvider } from "./context/SchedulerContext";
import { SelectedDateProvider } from "./context/SelectedDateContext";
import RootLayoutClient from "./RootLayoutClient";
import { RoleProvider } from "./context/RoleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arbitration Session Scheduler",
  description: "Schedule and manage arbitration sessions efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SchedulerProvider>
          <SelectedDateProvider>
            <RoleProvider>
              <RootLayoutClient>{children}</RootLayoutClient>
            </RoleProvider>
          </SelectedDateProvider>
        </SchedulerProvider>
      </body>
    </html>
  );
}
