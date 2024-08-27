'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'


interface Tab {
  name: string;
  route: string;
}

// Define the props for the ReportTabs component
interface ReportTabsProps {
  tabs: Tab[];
  params: string;
}

const ReportTabs = ({ tabs,params }: ReportTabsProps) => {
  const pathname=usePathname()
  return (
    <div className={`md:translate-y-[2px] space-x-2 pb-2 md:pb-0 md:space-x-4 flex items-center`}>
      {tabs?.map((tab, ind) => (
        <div key={ind} className="relative ">
          {ind !== 0 && tab.route==pathname && (
            <span className="p-5 bg-[#0E0F0F] rounded-bl-[200rem] dark:bg-white dark:border-opacity-10 md:inline-block hidden border-t-[1px] border-[#313131] absolute -bottom-4 -rotate-[52deg] -left-[.6rem]"></span>
          )}
          <div>
            <Link
              href={tab.route}
              className={`${tab.route==pathname
                ? "bg-[#0E0F0F] dark:bg-white dark:text-black rounded-[1rem] md:rounded-none md:rounded-t-[2rem] text-white "
                : "bg-[#E3F5FF] rounded-[1rem] border-none text-black"
                }   capitalize cursor-pointer text-xs md:text-lg py-2 inline-block border-[1px] dark:border-opacity-10 md:border-b-0 md:border-l-[1px] border-[#313131]   md:border-t-[1px] px-4 md:px-8 border-r-[1px]`}>
              {tab.name}
            </Link>

            {tab.route==pathname && (
              <span className=" p-5 md:inline-block hidden bg-[#0E0F0F] dark:bg-white dark:border-opacity-10 border-t-[1px] border-[#313131] absolute -bottom-4 rotate-[52deg] rounded-br-[200rem]  -right-[.6rem]"></span>
            )}
          </div>
        </div>
      ))}
    </div>

  )

}

export default ReportTabs;
