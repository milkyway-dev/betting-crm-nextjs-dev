'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname} from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = usePathname();
  const nav = [
    {
      text: "Home",
      Link: "/",
    },
    {
      text: "Subordinates",
      Link: "#",
    },
    {
      text: "transactions",
      Link: "#",
    },
  ];
  return (
    <div className="px-8 py-10 col-span-3 border-r-[.5px] border-[#313131] xl:col-span-2">
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
                  className={`rounded-full uppercase ${router===nav.Link?'border-white border bg-light_black':''}  px-10 py-2`}
                >
                  {nav.text}
                </Link>
              </li>
              <span className="w-[70%] opacity-35 -translate-y-2 inline-block mt-1 h-[1px] mx-[15%] rounded-full bg-gradient-to-r via-[#979797] from-[#313131] to-[#313131] "></span>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
