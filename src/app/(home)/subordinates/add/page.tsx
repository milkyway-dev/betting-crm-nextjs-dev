"use client";
import React, { useState } from "react";
import { AddFormData } from "@/utils/Types";
import ChevronDown from "@/component/svg/ChevronDown";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<AddFormData>({
    UserName: "",
    Password: "",
    Role: "",
  });

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Constructing an object from the form data
    const dataObject: AddFormData = {
      ...formData,
      UserName: formData.UserName.trim(), // Trim whitespace
      Password: formData.Password.trim(), // Trim whitespace
    };

    console.log(dataObject);

    // Reset form data after logging
    setFormData({
      UserName: "",
      Password: "",
      Role: "",
    });
  };

  return (
    <div className="pt-40 md:py-40 h-screen lg:h-full md:bg-[#0E0F0F] md:p-5 md:border-[1px] rounded-b-2xl rounded-l-2xl md:rounded-l-none rounded-r-2xl border-[#313131]">
      <div className="px-5 md:px-12 py-14 border-[1px] border-[#464646] w-[100%] md:w-[70%] lg:w-[50%]  xl:w-[45%] rounded-[1.5rem] md:rounded-[2.5rem] mx-auto bg-[#0E0E0E]">
        <form onSubmit={handelSubmit}>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              User Name
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
              <input
                type="text"
                name="UserName"
                placeholder="e.g. Anika"
                value={formData.UserName}
                onChange={(e) =>
                  setFormData({ ...formData, UserName: e.target.value })
                }
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              Password
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
              <input
                type="password"
                name="Password"
                placeholder="********"
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              Role
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] relative">
              <select
                name="Role"
                value={formData.Role}
                onChange={(e) =>
                  setFormData({ ...formData, Role: e.target.value })
                }
                className="outline-none w-full bg-[#1A1A1A] rounded-lg px-3 text-base text-white text-opacity-40 py-2.5 appearance-none"
                style={{ paddingRight: "30px" }}
              >
                <option value="">Select</option>
                <option value="agent">Agent</option>
                <option value="player">Player</option>
              </select>
              <span className="pr-4 text-white text-opacity-40">
                <ChevronDown />
              </span>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] border-[#AAAAAA] text-xl text-center py-3 rounded-xl shadow-xl"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
