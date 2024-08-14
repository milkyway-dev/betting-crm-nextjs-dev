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
 

  return (
    <>
      <div className="col-span-12 lg:col-span-9 xl:col-span-8">
        <Header />
        <div className="px-4 md:px-10 pt-5">
          <Tabs tabs={tabs} initialTab="transactions" />
          {children}
        </div>
      </div>
    </>
  );
}
