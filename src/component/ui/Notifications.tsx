'use client'
import React from "react";
import Redeem from "../svg/Redeem";
import Recharge from "../svg/Recharge";
import { usePathname } from "next/navigation";
const Notifications = () => {
  const pathname = usePathname()
  const data = [
    {
      icon: <Redeem />,
      text: "Netflix",
      debitor: "Gaurav",
      creditor: "Rana",
      Date: "Live",
    },
    {
      icon: <Recharge />,
      text: "Hotstar",
      debitor: "Gaurav",
      creditor: "Rana",
      Date: "Live",
    },
    {
      icon: <Redeem />,
      text: "Netflix",
      debitor: "Gaurav",
      creditor: "Rana",
      Date: "Live",
    }
  ];

  if (pathname === '/') {
    return;
  }

  return (
    <div className="fixed xl:static lg:block hidden h-screen dark:bg-white bg-bg_dashboard  border-l-[1px] dark:border-opacity-10 col-span-2 px-5 py-5 border-[#282828] ">
      <div className="text-white bg-[#232525] dark:bg-onDark dark:text-black px-8 py-1.5  text-lg rounded-3xl tracking-wide inline-block">
        Notification
      </div>
      {data?.map((item, ind) => (
        <div key={ind} className="flex pt-8 space-x-3 border-b-[1.5px] dark:border-gray-200 border-[#282828] pb-2">
          <div>
            {item.icon}
          </div>
          <div>
            <span className="text-xl tracking-wider text-white dark:text-black">{item.text}</span>
            <div className=" py-2 space-y-2">
              <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                <span className="text-white dark:text-[#9FA1A2]  text-opacity-30 text-[1rem]">
                  Debitor
                </span>
                <span className="text-white dark:text-black  text-opacity-70 text-[.9rem]">
                  {item.debitor}
                </span>
              </div>
              <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                <span className="text-white dark:text-[#9FA1A2] text-opacity-30 text-[1rem]">
                  Creditor
                </span>
                <span className="text-white dark:text-black  text-opacity-70 text-[.9rem]">
                  {item.creditor}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
