'use client'
import React, { useEffect, useState } from "react";
import LightMode from "../svg/LightMode";
import Setting from "../svg/Setting";
import Notification from "../svg/Notification";
import Logout from "../svg/Logout";
import DarkMode from "../svg/DarkMode";
import Cookies from 'js-cookie'
import { useAppDispatch } from "@/utils/hooks";
import { UpdateNotification } from "@/redux/ReduxSlice";

const Header = () => {
  const dispatch=useAppDispatch()
  const [dark,setDark] = useState(false)
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
    <div className="text-white flex items-center py-4 border-b-[.5px] border-[#313131] justify-end">
      <div className="flex items-center space-x-3 w-[90%] mx-auto justify-end">
        <button onClick={toggleTheme}>{dark?<LightMode />:<DarkMode />}</button>
        <Setting />
        <button onClick={()=>dispatch(UpdateNotification(true))}><Notification /></button>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
