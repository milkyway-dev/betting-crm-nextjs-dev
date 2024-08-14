"use client";
import React, { useState } from "react";
import ThreeDots from "../svg/ThreeDots";
import Modal from "./Modal";

const TableThreeDots = () => {
  const [open, setOPen] = useState(false);
  const [type, setType] = useState("s");
  const handelOpen = (state: boolean, Type: string) => {
    setOPen(state);
    setType(Type);
  };
  const handelClose = () => {
    setOPen(false);
  };

  const Buttons = ["Edit", "Delete", "Recharge", "Redeem"];
  return (
    <>
      <td className="flex justify-start pl-6 pt-6 cursor-pointer group relative">
        <ThreeDots />
        <div className="absolute px-3 z-50 py-1.5 group-hover:block hidden rounded-lg dark:bg-onDark bg-dark_light_black space-y-1 top-0 text-sm">
          {Buttons?.map((item, ind) => (
            <button
              key={ind}
              onClick={() => handelOpen(true, item)}
              className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg dark:text-black  dark:hover:bg-white hover:bg-dark_black  w-full block"
            >
              {item}
            </button>
          ))}
        </div>
      </td>
      <Modal isOpen={open} Type={type} onClose={handelClose} />
    </>
  );
};

export default TableThreeDots;
