'use client'
import React, { useEffect, useState } from "react";
import LightMode from "../svg/LightMode";
import Setting from "../svg/Setting";
import Notification from "../svg/Notification";
import Logout from "../svg/Logout";
import DarkMode from "../svg/DarkMode";
import { useTheme } from 'next-themes';
import { useDispatch} from "react-redux";
import { UpdateHeader, UpdateNotification } from "@/redux/ReduxSlice";
import HamBurger from "../svg/HamBurger";
import { useRouter } from "next/navigation";
import Infinite from "../svg/Infinite";
import { getCredits } from "@/utils/action";
const Header = ({Back}:any) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const { systemTheme, theme, setTheme } = useTheme();
  const [user, setUser] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const fetchUser = async () => {
    const currentUser = await getCredits();
    setUser(currentUser);
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="text-white pl-5 flex items-center sticky top-0 dark:bg-white dark:text-black dark:text-opacity-75 bg-bg_dashboard z-50 py-4 border-b-[.5px] border-[#313131] dark:border-opacity-10 justify-end">
      <button className="lg:hidden" onClick={() => dispatch(UpdateHeader(true))}><HamBurger /></button>
      {Back&&<button onClick={() => router.push('/subordinates/all')} className="xl:block hidden">{Back}</button>}
      <div className="flex items-center space-x-3 w-[90%] mx-auto justify-end">
        {user?<div className="bg-gradient-to-tr from-[#F1A535] to-[#FCD361] p-[1px] rounded-xl">
          <div className="flex space-x-2 items-center dark:bg-onDark bg-dark_light_black rounded-xl px-4 py-1.5">
            <span className="text-white text-[.9rem] md:text-[.9] dark:text-black tracking-wider">Credits :</span>
            <span className="text-white text-opacity-40 text-[.9rem] dark:text-black">{user?.credits == null ? <Infinite /> : user?.credits}</span>
          </div>
        </div>: <div className="invisible bg-gradient-to-tr from-[#F1A535]  to-[#FCD361] p-[1px] rounded-xl">
          <div className="flex space-x-2 items-center dark:bg-onDark bg-dark_light_black rounded-xl px-4 py-1.5">
            <span className="text-white text-[.9rem] md:text-[.9] dark:text-black tracking-wider">Credits :</span>
            <span className="text-white text-opacity-40 text-[.9rem] dark:text-black">{user?.credits == null ? <Infinite /> : user?.credits}</span>
          </div>
        </div>}
        {
          !mounted ? null :
          currentTheme==="dark"?<button onClick={()=>setTheme("light")}><DarkMode /></button>:<button onClick={()=>setTheme("dark")}><LightMode/></button>
        }
        <Setting />
        <button onClick={()=>dispatch(UpdateNotification(true))}><Notification /></button>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
