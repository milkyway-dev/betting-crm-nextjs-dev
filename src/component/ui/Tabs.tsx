"use client"
import { TabProps} from "@/utils/Types";
import React, { useState } from "react";

const Tabs: React.FC<TabProps> = ({tabs}) => {
  const [state, setState] = useState("Agents");
  return (
    <div className="translate-y-[2px] space-x-4 flex items-center ">
      {tabs?.map((tab, ind) => (
        <div key={ind} className="relative">
          {ind !== 0 && tab == state && (
            <span className="inline-block p-5 bg-[#0E0F0F] border-t-[1px] border-[#313131] absolute -bottom-3 -rotate-[58deg] -left-[.6rem]"></span>
          )}
          <button
            onClick={() => setState(tab)}
            className={`${
              tab == state
                ? "bg-[#0E0F0F] rounded-t-[2rem] text-white "
                : "bg-[#E3F5FF] rounded-[1rem]  text-black"
            }   uppercase text-lg py-3 border-l-[1px] border-[#313131]   border-t-[1px] px-8 border-r-[1px]`}
          >
            {tab}
          </button>
          {tab == state && (
            <span className="inline-block p-5 bg-[#0E0F0F] border-t-[1px] border-[#313131] absolute -bottom-3 rotate-[58deg] -right-[.6rem]"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
