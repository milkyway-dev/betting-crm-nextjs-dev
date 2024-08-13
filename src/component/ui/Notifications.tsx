'use client'
import React from "react";
import Redeem from "../svg/Redeem";
import Recharge from "../svg/Recharge";
import { usePathname } from "next/navigation";
const Notifications = () => {
  const pathname=usePathname()
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

  if (pathname==='/') {
    return;
  }

  return (
    <div className="fixed xl:static right-[-500%] h-screen bg-bg_dashboard  border-l-[1px] col-span-2 px-5 py-5 border-[#282828] ">
      <div className="text-white bg-[#232525] px-8 py-1.5  text-lg rounded-3xl tracking-wide inline-block">
        Notification
      </div>
      {data?.map((item,ind) => (
        <div key={ind} className="flex pt-8 space-x-3 border-b-[1.5px] border-[#282828] pb-2">
          <div>
            {item.icon}
          </div>
          <div>
            <span className="text-xl tracking-wider text-white">{item.text}</span>
            <div className="pt-2 space-y-2">
              <div className="flex items-center space-x-5  bg-[#232525] px-2 py-1 rounded-lg">
                <span className="text-white  font-extralight text-opacity-40 text-sm">
                  Debitor
                </span>
                <span className="text-white  font-light  text-sm">{item.debitor}</span>
              </div>
              <div className="flex items-center space-x-5 bg-[#232525] px-2 py-1 rounded-lg">
                <span className="text-white  font-extralight text-opacity-40 text-sm">
                  Creditor
                </span>
                <span className="text-white  font-light  text-sm">{item.creditor}</span>
              </div>
              <div className="text-white font-extralight text-opacity-60">
                {item.Date}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
