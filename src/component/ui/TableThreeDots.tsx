"use client";
import React, { useState } from "react";
import ThreeDots from "../svg/ThreeDots";
import Modal from "./Modal";
import { TableThreeDotsProps } from "@/utils/Types";

const TableThreeDots: React.FC<TableThreeDotsProps>  = ({data}) => {
  const [open, setOPen] = useState(false)
  const [type,setType]=useState('s')
  const handelOpen = (state:boolean,Type:string) => {
    setOPen(state)
    setType(Type)
  }
  console.log(data);
  
  const handelClose = () => {
    setOPen(false);
  };

  const Buttons = ["Edit", "Delete", "Recharge", "Redeem"];
  return (
    <>
      <td className="flex pt-6 justify- cursor-pointer group relative">
        <ThreeDots />
        <div className="absolute px-3 z-50 py-1.5 group-hover:block hidden rounded-lg bg-dark_light_black space-y-1 top-0 text-sm">
          {Buttons?.map((item, ind) => (
            <button
              key={ind}
              onClick={() => handelOpen(true, item)}
              className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg hover:bg-dark_black  w-full block"
            >
              {item}
            </button>
          ))}
        </div>
      </td>
      <Modal isOpen={open} Type={type} onClose={handelClose} data={data}/>
    </>
  );
};

export default TableThreeDots;
