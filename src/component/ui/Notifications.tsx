"use client";
import React, { useEffect, useState } from "react";
import Redeem from "../svg/Redeem";
import Recharge from "../svg/Recharge";
import { useDispatch, useSelector } from "react-redux";
import Close from "../svg/Close";
import { UpdateNotification } from "@/redux/ReduxSlice";
import { getUserNotifications } from "@/utils/action";
const Notifications = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: { globlestate: { openNotification: Boolean } }) =>
      state?.globlestate.openNotification
  );
  const [notificationData, setNotificationData] = useState([]);
  const getNotification = async () => {
    const data: any = await getUserNotifications();

    setNotificationData(data);
  };
  useEffect(() => {
    getNotification();
  }, []);

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
    },
  ];

  return (
    <div
      className={` ${
        isOpen
          ? "right-[0%] top-0 fixed xl:static transition-all "
          : "-right-[100%] top-0 fixed xl:static transition-all "
      }   ${
        isOpen ? "flex-.2 transition-all" : "w-[0%] hidden"
      } z-50 h-screen  px-5 py-5 dark:bg-white bg-bg_dashboard  border-l-[1px] dark:border-opacity-10 xl:col-span-0 border-[#282828]`}
    >
      <button
        className={`absolute top-2 cursor-pointer ${
          isOpen ? "block" : "hidden"
        } right-2`}
        onClick={() => dispatch(UpdateNotification(false))}
      >
        <Close />
      </button>
      <div className="text-white bg-[#232525] dark:bg-onDark dark:text-black px-6 md:px-8 py-1.5  text-[.9rem] md:text-lg rounded-3xl tracking-wide inline-block">
        Notification
      </div>
      <div className="flex-1 overflow-y-scroll h-[80vh]">
        {data?.map((item, ind) => (
          <div
            key={ind}
            className="flex pt-8 space-x-3 border-b-[1.5px] dark:border-gray-200 border-[#282828] pb-2"
          >
            <div>{item.icon}</div>
            <div>
              <span className="text-[.8rem] md:text-base tracking-wider text-white dark:text-black">
                {item.text}
              </span>
              <div className=" py-2 space-y-2">
                <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                  <span className="text-white dark:text-[#9FA1A2]  text-opacity-30 text-[.8rem]">
                    Debitor
                  </span>
                  <span className="text-white dark:text-black  text-opacity-70 text-[.7rem]">
                    {item.debitor}
                  </span>
                </div>
                <div className="bg-dark_light_black dark:bg-onDark  px-2 py-1 flex items-center rounded-[.3rem] space-x-4">
                  <span className="text-white dark:text-[#9FA1A2] text-opacity-30 text-[.8rem]">
                    Creditor
                  </span>
                  <span className="text-white dark:text-black  text-opacity-70 text-[.7rem]">
                    {item.creditor}
                  </span>
                </div>
                {notificationData?.map((notification: any, index: number) => (
                  <li
                    key={index}
                    className="list-none text-white dark:text-black text-[0.9rem] md:text-base tracking-wide bg-dark_light_black dark:bg-onDark px-4 py-2 rounded-md my-2 shadow-sm"
                  >
                    {notification.message}
                  </li>
                ))}
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
