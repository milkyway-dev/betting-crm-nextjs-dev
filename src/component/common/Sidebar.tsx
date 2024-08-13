"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import HamBurger from "../svg/HamBurger";
import Close from "../svg/Close";

const Sidebar = () => {
  const [toggle,setToggle]=useState(false)
  const router = usePathname();
  const nav = [
    {
      text: "Home",
      Link: "/",
    },
    {
      text: "Subordinates",
      Link: "/subordinates/agents",
    },
    {
      text: "transactions",
      Link: "/transactions",
    },
  ];
  return (
    <>
      {!toggle?<button onClick={()=>setToggle(!toggle)} className="absolute top-[1.55%] lg:hidden left-[4%]"><HamBurger /></button>:
      <button onClick={()=>setToggle(!toggle)} className="absolute top-[1%] lg:hidden left-[3%] z-[51]"><Close /></button>}
      <div className={`flex flex-col fixed ${!toggle?'-left-[200%]':'left-0'} z-50 transition-all top-0  h-screen  lg:h-auto  bg-dark_black lg:bg-transparent lg:static items-center justify-between px-4 py-10  col-span-3 border-r-[.5px] border-[#313131] xl:col-span-2`}>
        <div>
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/Light_Logo.png"
              alt="logo"
              width={200}
              height={100}
              className="mx-auto"
              quality={100}
            />
          </div>
          {/* DropDown */}
          <div>
            <ul className="pt-12 space-y-1">
              {nav?.map((nav, ind) => (
                <>
                  <li
                    key={ind}
                    className="flex flex-col items-center justify-center font-light text-white"
                  >
                    <Link
                      href={nav.Link}
                      className={`rounded-full uppercase ${
                        router === nav.Link
                          ? "border-white border bg-light_black"
                          : ""
                      }  px-10 py-2`}
                    >
                      {nav.text}
                    </Link>
                  </li>
                  <span className="w-[80%] opacity-35 -translate-y-2 inline-block mt-1 h-[1px] mx-[15%] rounded-full bg-gradient-to-r via-[#979797] from-[#313131] to-[#313131] "></span>
                </>
              ))}
            </ul>
          </div>
        </div>
        {/* Profile */}
        <div className="flex items-center space-x-4">
          <div>
            <Image
              src={"/assets/images/profile.png"}
              quality={100}
              alt="profile"
              height={400}
              width={400}
              className="w-[45px] rounded-full"
            />
          </div>
          <div>
            <div className="text-white text-base font-semibold">
              Gaurav Kumar
            </div>
            <div className="text-white text-opacity-50 text-sm font-semibold">
              3048
            </div>
          </div>
        </div>
      </div>
      {toggle&&<div className="fixed  transition-all top-0 left-0 w-full h-screen lg:hidden bg-black bg-opacity-35" onClick={() => setToggle(!toggle)}></div>}
    </>
  );
};

export default Sidebar;
