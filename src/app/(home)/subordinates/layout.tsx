import type { Metadata } from "next";
import Header from "@/component/common/Header";
import Tabs from "@/component/ui/Tabs";

export const metadata: Metadata = {
  title: "CRM - Betting Paradise",
  description: "Betting Paradise CRM.",
};



export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="col-span-12 lg:col-span-9 xl:col-span-8">
        <Header />
        <Tabs tabs={["agents", "players", "add"]}  />
        {children}
      </div>
    </>
  );
}
