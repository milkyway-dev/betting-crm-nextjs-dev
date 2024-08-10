import Header from "@/component/common/Header";
import Sidebar from "@/component/common/Sidebar";
import { Providers } from "@/redux/Providers";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";


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
        <div className="grid grid-cols-12 h-screen bg-bg_dashboard">
          <Sidebar />
          <div className="col-span-12 lg:col-span-9 xl:col-span-10 pb-10">
            <Header />
            {children}
          </div>
        </div>
      </Providers>
    </>
  );
}
