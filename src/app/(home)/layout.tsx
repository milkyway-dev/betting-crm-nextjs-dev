import Header from "@/component/common/Header";
import Sidebar from "@/component/common/Sidebar";
import { Providers } from "@/redux/Providers";
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
      <Toaster position="bottom-center" />
      <Providers>
        <div className="grid grid-cols-12 overflow-y-scroll h-screen bg-bg_dashboard">
          <Sidebar />
          {children}
          <Notifications />
        </div>
      </Providers>
    </>
  );
}
