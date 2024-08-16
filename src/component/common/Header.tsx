'use client'
import React, { useEffect, useState } from "react";
import LightMode from "../svg/LightMode";
import Setting from "../svg/Setting";
import Notification from "../svg/Notification";
import Logout from "../svg/Logout";
import DarkMode from "../svg/DarkMode";
import { useTheme } from 'next-themes';
import { useSelector } from "react-redux";
import { ReportsData } from "@/utils/Types";
const Header = () => {
  const Isreport = useSelector((state: ReportsData) => state?.globlestate.Agent)

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="text-white pl-5 flex items-center sticky top-0 dark:bg-white dark:text-black dark:text-opacity-75 bg-bg_dashboard z-50 py-4 border-b-[.5px] border-[#313131] dark:border-opacity-10 justify-end">
      <div className="flex items-center w-full space-x-1.5">
        <div className="text-white text-base text-opacity-50">Subordinates </div>
        {Isreport?.username&&<div className="text-base tracking-wide">/ {Isreport?.username} </div>}
        {/* <div className="text-white text-base text-opacity-50"> Player </div> */}
        {/* <div className="text-base tracking-wide">/ Gaurav</div> */}
      </div>
      <div className="flex items-center space-x-3 w-[90%] mx-auto justify-end">
        {currentTheme==="dark"?<button onClick={()=>setTheme("light")}><DarkMode /></button>:<button onClick={()=>setTheme("dark")}><LightMode/></button>}
        <Setting />
        <button><Notification /></button>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
