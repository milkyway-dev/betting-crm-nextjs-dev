"use client"
import React, { useState } from "react";
import ThreeDots from "../svg/ThreeDots";
import Modal from "./Modal";

const TableThreeDots = () => {
  const [open, setOPen] = useState(false)
  const [type,setType]=useState('s')
  const handelOpen = (state:boolean,Type:string) => {
    setOPen(state)
    setType(Type)
  }
  const handelClose = () => {

    setOPen(false)
  }
  return (
    <>
      <td className="flex pt-6 justify- cursor-pointer group relative">
        <ThreeDots />
        <div className="absolute px-3 py-1.5 group-hover:block hidden rounded-lg bg-dark_light_black space-y-1 top-0 text-sm">
          <button onClick={()=>handelOpen(true,"Edit")} className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg hover:bg-dark_black  w-full block">
            Edit
          </button>
          <button onClick={()=>handelOpen(true,"Delete")} className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg hover:bg-dark_black w-full block">
            Delete
          </button>
        </div>
      </td>
      <Modal isOpen={open} Type={type} onClose={handelClose}/>
    </>
  );
};

export default TableThreeDots;
