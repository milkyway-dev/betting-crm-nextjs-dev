import React from "react";
import LightMode from "../svg/LightMode";
import Setting from "../svg/Setting";
import Notification from "../svg/Notification";
import Logout from "../svg/Logout";

const Header = () => {
  return (
    <div className="text-white flex items-center py-4 border-b-[.5px] border-[#313131]  justify-end">
      <div className="flex items-center space-x-3 w-[90%] mx-auto justify-end">
        <LightMode />
        <Setting />
        <Notification />
        <Logout />
      </div>
    </div>
  );
};

export default Header;
