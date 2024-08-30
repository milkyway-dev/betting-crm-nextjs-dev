import type { Metadata } from "next";
import Header from "@/component/common/Header";
import Tabs from "@/component/ui/Tabs";
import { getCurrentUser } from "@/utils/utils";
import SearchBar from "@/component/ui/SearchBar";

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
  const accessto=['admin','agent'] 
  return (
    <>
      <div className="flex-1">
        <Header />
        <div className="px-4 md:px-10 pt-5">
          <div className="w-full md:w-[50%] pb-4">
             <SearchBar/>
          </div>
          <Tabs tabs={accessto.includes(user?.role)?tabs:[]} initialTab="transactions" />
          {children}
        </div>
      </div>
    </>
  );
}
