"use client";
import React, { useState } from "react";
import ThreeDots from "../svg/ThreeDots";
import Modal from "./Modal";
import { TableThreeDotsProps } from "@/utils/Types";
import Close from "../svg/Close";

const TableThreeDots: React.FC<TableThreeDotsProps> = ({ data,isDisable }) => {
  const [open, setOPen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [type, setType] = useState('')
  const handelOpen = (state: boolean, Type: string) => {
    setOPen(state)
    setType(Type)
    setToggle(!toggle)
  }

  const handelClose = () => {
    setOPen(false);
  };

  const Buttons = ["Edit", "Delete", "Recharge", "Redeem"];
  return (
    <>
      <td className=" pl-6 cursor-pointer relative">
        <div className="flex justify-center items-center">
          <button onClick={() => setToggle(!toggle)}><ThreeDots /></button>
          {isDisable&&<div className={`absolute z-50 px-3 ${toggle ? 'scale-100' : 'scale-0'} transition-all z-[78]  py-1.5 rounded-lg dark:bg-onDark bg-dark_light_black space-y-1  right-0 text-sm`}>
            {Buttons?.map((item, ind) => (
              <button
                key={ind}
                onClick={() => handelOpen(true, item)}
                className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg dark:text-black  dark:hover:bg-white hover:bg-dark_black  w-full block"
              >
                {item}
              </button>
            ))}
            <button onClick={() => setToggle(!toggle)} className="text-sm absolute -top-1 text-opacity-50 text-white right-0 scale-[.6]"><Close /></button>
          </div>}
        </div>

      </td>
      <Modal isOpen={open} Type={type} onClose={handelClose} data={data} />
    </>
  );
};

export default TableThreeDots;
