import type { Metadata } from "next";
import Header from "@/component/common/Header";
import Tabs from "@/component/ui/Tabs";
import { getCurrentUser } from "@/utils/utils";

export const metadata: Metadata = {
  title: "CRM - Betting Paradise",
  description: "Betting Paradise CRM.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: any = await getCurrentUser();
  const userRole = user?.role;

  let tabs = ["players", "add"];
  if (userRole === "admin") {
    tabs.unshift("agents");
  }

  return (
    <>
      <div className="flex-1">
        <Header />
        <div className="px-4 md:px-10 pt-5">
          <Tabs tabs={tabs} initialTab="subordinates" />
          {children}
        </div>
      </div>
    </>
  );
}
