import type { Metadata } from "next";
import Header from "@/component/common/Header";
import Tabs from "@/component/ui/Tabs";
import {getCurrentUser, rolesHierarchy} from "@/utils/utils";
import Link from "next/link";

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
  const userRole:string  = user?.role;

  let tabs = await rolesHierarchy(userRole)
  return (
    <>
      <div className="flex-1">
        <Header />
        <div className="px-4 md:px-10 pt-5">
          <div className="flex items-center justify-between">
            <Tabs tabs={tabs} initialTab="subordinates" />
            <Link href={'/subordinates/add'}>
               <button className="text-white bg-light_black px-6 rounded-lg mb-2.5 py-1.5">Add+</button>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
