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

  let tabs = ["coin", "betting"];
  const user:any = await getCurrentUser()

  return (
    <>
      <div className="flex-1">
        <Header />
        <div className="px-4 md:px-10 pt-5">
          <Tabs tabs={user?.role=='admin'?tabs:[]} initialTab="transactions" />
          {children}
        </div>
      </div>
    </>
  );
}
