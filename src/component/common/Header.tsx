'use client'
import React, { useEffect, useState } from "react";
import LightMode from "../svg/LightMode";
import Setting from "../svg/Setting";
import Notification from "../svg/Notification";
import Logout from "../svg/Logout";
import DarkMode from "../svg/DarkMode";
import Cookies from 'js-cookie'
import { deleteCookie } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Header = () => {
  const [dark,setDark] = useState(false)
  const router = useRouter();

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
    Cookies.set("darkmode", String(!dark));
  }

  useEffect(() => {
    const isDarkStr = Cookies.get("darkmode");
    let isDark = false; 
  
    if (isDarkStr === 'true') {
      isDark = true;
    }
  
    document.body.classList.toggle('dark', isDark);
    setDark(isDark);
  }, []);

  return (
    <div className="text-white flex items-center sticky top-0 bg-bg_dashboard z-50 py-4 border-b-[.5px] border-[#313131] justify-end">
      <div className="flex items-center space-x-3 w-[90%] mx-auto justify-end">
        <button onClick={toggleTheme}>{dark?<LightMode />:<DarkMode />}</button>
        <Setting />
        <button><Notification /></button>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
