import Sidebar from "@/component/common/Sidebar";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Notifications from "@/component/ui/Notifications";

export const metadata:Metadata = {
  title: "CRM - Betting Paradise",
  description: "Betting Paradise Crm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="md:flex  dark:bg-white bg-bg_dashboard">
          <Sidebar />
          {children}
          <Notifications />
        </div>
    </>
  );
}
