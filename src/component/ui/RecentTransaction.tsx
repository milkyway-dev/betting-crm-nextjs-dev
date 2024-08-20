import React from "react";
import Redeem from "../svg/Redeem";
import Recharge from "../svg/Recharge";
import { TransactionProps } from "@/utils/Types";
import { formatDate } from "@/utils/utils";

const RecentTransaction: React.FC<TransactionProps> = ({ data }) => {
  // const transaction = [
  //   {
  //     status: <Redeem />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "-$4000",
  //   },
  //   {
  //     status: <Recharge />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "+$3500",
  //   },
  //   {
  //     status: <Redeem />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "-$4000",
  //   },
  //   {
  //     status: <Recharge />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "+$4000",
  //   },
  //   {
  //     status: <Redeem />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "-$4000",
  //   },
  //   {
  //     status: <Recharge />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "+$2300",
  //   },
  //   {
  //     status: <Redeem />,
  //     text: "Netflix",
  //     debitor: "Gaurav",
  //     creditor: "Neeraj",
  //     dateTime: "27 March 2020, at 12:30 PM",
  //     coins: "-$4000",
  //   },
  // ];
  return (
    <div className="border-[1px] border-[rgb(40,40,40)] dark:border-opacity-30 text-white dark:bg-white  rounded-3xl">
      <div className="text-white px-6 tracking-wide py-2 m-3 dark:text-black dark:bg-onDark bg-light_black rounded-3xl inline-block">
        Recent Transactions
      </div>
      {/* Transaction Table */}
      <div className="lg:h-[44vh] xl:h-[62vh] dark:bg-white relative rounded-3xl lg:overflow-y-scroll">
        {data?.map((item: any, index: any) => (
          <div key={index}>
            <div className="flex justify-between pt-8 px-5 md:px-8">
              <div className="flex space-x-2 w-[60%] md:space-x-4">
                {item?.type === "redeem" ? <Redeem /> : <Recharge />}
                <div>
                  <div className="text-base text-white dark:text-black tracking-widest capitalize">
                    {item?.type}
                  </div>
                  <div className="flex items-center pt-3 space-x-2">
                    <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                      <span className="text-white dark:text-[#9FA1A2]  text-opacity-30 text-[1rem]">
                        Sender
                      </span>
                      <span className="text-white dark:text-black  text-opacity-70 text-[.9rem]">
                        {item?.sender?.username}
                      </span>
                    </div>
                    <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                      <span className="text-white dark:text-[#9FA1A2] text-opacity-30 text-[1rem]">
                        Receiver
                      </span>
                      <span className="text-white dark:text-black  text-opacity-70 text-[.9rem]">
                        {item?.receiver?.username}
                      </span>
                    </div>
                  </div>
                  <div className="text-white dark:text-black text-xs font-extralight text-opacity-30 pt-2">
                    {formatDate(item?.date)}
                  </div>
                </div>
              </div>
              <div className="text-sm dark:text-black dark:text-opacity-60 text-[#A0AEC0]">
                <span>{item?.type === "redeem" ? "-" : "+"}</span>
                {item?.amount}
              </div>
            </div>
            <span className="inline-block w-[92%] mx-[4%] h-[1.5px] bg-[#282828]"></span>
          </div>
        ))}
        <div className="sticky w-full md:block hidden h-[10%] rounded-3xl bg-gradient-to-t to-transparent dark:from-[#E4E5E5] from-black bottom-0 left-0"></div>
      </div>
    </div>
  );
};

export default RecentTransaction;
