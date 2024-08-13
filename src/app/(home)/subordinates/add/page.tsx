"use client";
import React, { useState } from "react";
import { AddFormData } from "@/utils/Types";
import ChevronDown from "@/component/svg/ChevronDown";
import { createAgent, createPlayer } from "@/utils/action";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<AddFormData>({
    username: "",
    password: "",
    role: "",
  });
  const [role, setRole] = useState("agent");
 
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Constructing an object from the form data
    const dataObject: AddFormData = {
      ...formData,
      username: formData.username.trim(), // Trim whitespace
      password: formData.password.trim(), // Trim whitespace
    };

    console.log(dataObject);
    const role= formData.role;
    
    if(formData?.role === 'agent'){
    const response = await createAgent(dataObject );
    if (response?.error) {
      return alert(response?.error || "Can't Create Agent");
    }
      toast.success("Agent Created Successfully!")
      }else{
      const response = await createPlayer(dataObject);
      if (response?.error) {
        return alert(response?.error || "Can't Create Agent");
      }
        toast.success("Player Created Successfully!")
      }
    
    
    // Reset form data after logging
    setFormData({
      username: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="h-screen lg:h-[89%] border-[1px] border-[#464646] relative rounded-3xl">
      <div className="px-12 py-14 border-[1px] border-[#464646] w-[90%] md:w-[70%] lg:w-[50%]  xl:w-[40%] rounded-[2.5rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#0E0E0E]">
        <form onSubmit={handelSubmit}>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              User Name
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
              <input
                type="text"
                name="username"
                placeholder="e.g. Anika"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              password
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>{
                  setFormData({ ...formData, password: e.target.value }),
                  setRole(e.target.value)
                }}
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">
              role
            </div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] relative">
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
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
