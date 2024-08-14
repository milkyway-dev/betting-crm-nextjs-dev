"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HamBurger from "../svg/HamBurger";
import Close from "../svg/Close";
import { getCurrentUser } from "@/utils/utils";

const Sidebar = () => {
  const [toggle,setToggle]=useState(false)
  const router = usePathname();
  const [user, setUser] = useState<any | null>(null);
  const [nav, setNav] = useState([
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
      Link: "/transactions/coin",
    },
  ]);
  const fetchUser = async () => {
    const currentUser:any = await getCurrentUser(); 
    setUser(currentUser); 
    if (currentUser?.role === "agent") {
      setNav((prevNav) =>
        prevNav.map((navItem) =>
          navItem.text === "Subordinates"
            ? { ...navItem, Link: "/subordinates/players" } 
            : navItem
        )
      );
    }
  };
  useEffect(() => {
    fetchUser();
    
  }, []); 

  

  
  
  return (
    <>
      {!toggle?<button onClick={()=>setToggle(!toggle)} className="absolute top-[1.55%] z-[51]  lg:hidden left-[4%]"><HamBurger /></button>:
      <button onClick={()=>setToggle(!toggle)} className="absolute top-[1%] lg:hidden left-[3%] z-[56]"><Close /></button>}
      <div className={`flex flex-col fixed ${!toggle?'-left-[200%]':'left-0'}  z-[55] transition-all top-0 w-[60%] md:w-[30%] lg:w-auto h-screen  dark:bg-white bg-dark_black lg:bg-transparent lg:static items-center justify-between px-4 py-10  col-span-3 border-r-[.5px] dark:border-opacity-10 border-[#313131] xl:col-span-2`}>
        <div>
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/Dark_Logo.svg"
              alt="logo"
              width={200}
              height={100}
              className="mx-auto w-[120px] md:w-[160px] dark:hidden block"
              quality={100}
            />
                <Image
              src="/assets/images/Light_Logo.svg"
              alt="logo"
              width={200}
              height={100}
              className="mx-auto w-[120px] md:w-[160px] dark:block hidden"
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
                    onClick={()=>setToggle(!toggle)} 
                    className="flex flex-col items-center justify-center font-light dark:text-black text-white"
                  >
                    <Link
                      href={nav.Link}
                      className={`rounded-xl uppercase ${
                        router === nav.Link
                          ? "border-white border border-opacity-30 dark:border-gray-600 dark:border-[1.5px] dark:bg-onDark bg-light_black"
                          : ""
                      } py-2 w-full px-5 lg:px-0 text-center`}
                    >
                      {nav.text}
                    </Link>
                  </li>
                  <span className="w-[80%] opacity-35 -translate-y-2 inline-block mt-1 h-[1px] mx-[15%] rounded-full bg-gradient-to-r dark:from-[#2e2e2e00] dark:to-[#2e2e2e00] dark:via-[#313131] via-[#979797] from-[#313131] to-[#313131] "></span>
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
              className="w-[45px] dark:border-[3px]  dark:border-onDark rounded-full"
            />
          </div>
          <div>
            <div className="text-white dark:text-black dark:text-opacity-80  capitalize tracking-wide text-base font-semibold">
              {user?.username}
            </div>
            <div className="text-white text-opacity-50 text-sm font-semibold">
              {user?.credits}
            </div>
          </div>
        </div>
      </div>
      {toggle&&<div className="fixed  transition-all top-0 left-0 w-full z-[53] h-screen lg:hidden bg-black bg-opacity-35" onClick={() => setToggle(!toggle)}></div>}
    </>
  );
};

export default Sidebar;
