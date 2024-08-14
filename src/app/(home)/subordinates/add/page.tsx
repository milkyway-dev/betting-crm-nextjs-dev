"use client";
import React, { useEffect, useState } from "react";
import { AddFormData } from "@/utils/Types";
import ChevronDown from "@/component/svg/ChevronDown";
import { createAgent, createPlayer } from "@/utils/action";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/utils/utils";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<AddFormData>({
    username: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    role: "",
  });
  
  const [selectRole, setSelectRole] = useState<string[]>([ "player"]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const user: any = await getCurrentUser();
        const role = user?.role;

        if (role === "admin") {
          setSelectRole(["select", "agent", "player"]);
        } else {
          setSelectRole(["select", "player"]);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchRole();
  }, []);


  const validateForm = () => {
    const newErrors = { username: "", password: "", role: "" };

    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username should contain at least 4 letters.";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        "Username should not contain special characters except for hyphens (-) and underscores (_).";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be a minimum of 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password should contain at least one capital letter.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password should contain at least one special character.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password && !newErrors.role;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataObject: AddFormData = {
      ...formData,
      username: formData.username.trim(),
      password: formData.password.trim(),
    };

    let response;
    if (formData.role === "agent") {
      response = await createAgent(dataObject);
    } else {
      response = await createPlayer(dataObject);
    }

    if (response?.error) {
      alert(response?.error || `Can't create ${formData.role}`);
    } else {
      toast.success(`${formData.role} Created Successfully!`);
      setFormData({ username: "", password: "", role: "" });
      setErrors({ username: "", password: "", role: "" });
    }
  };

  return (
    <div className="pt-40 md:py-40 h-screen lg:h-full md:bg-[#0E0F0F] md:p-5 md:border-[1px] rounded-b-2xl rounded-l-2xl md:rounded-l-none rounded-r-2xl border-[#313131]">
      <div className="px-5 md:px-12 py-14 border-[1px] border-[#464646] w-[100%] md:w-[70%] lg:w-[50%] xl:w-[45%] rounded-[1.5rem] md:rounded-[2.5rem] mx-auto bg-[#0E0E0E]">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">Username</div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-1 border-opacity-60 border-dark_black rounded-lg border-[2px]">
              <input
                type="text"
                name="username"
                placeholder="e.g. Anika"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs pl-2">{errors.username}</p>}
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">Password</div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-1 border-opacity-60 border-dark_black rounded-lg border-[2px]">
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs pl-2">{errors.password}</p>}
          </div>
          <div>
            <div className="text-white text-opacity-40 text-base pl-2 pb-2">Role</div>
            <div className="bg-[#1A1A1A] flex pl-4 items-center mb-1 border-opacity-60 border-dark_black rounded-lg border-[2px] relative">
              <select
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="outline-none w-full bg-[#1A1A1A] rounded-lg px-3 text-base text-white text-opacity-40 py-2.5 appearance-none"
                style={{ paddingRight: "30px" }}
              >
                {selectRole?.map((role, idx)=>(
                 <option key={idx} className="uppercase" value={role}><span className="uppercase">{role}</span></option>
                ))}
              </select>
              <span className="pr-4 text-white text-opacity-40">
                <ChevronDown />
              </span>
            </div>
            {errors.role && <p className="text-red-500 text-xs pl-2">{errors.role}</p>}
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