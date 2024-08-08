"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShowEye from "@/component/svg/ShowEye";
import HideEye from "@/component/svg/HideEye";
import { useRouter } from "next/navigation";
import { Field, FormData } from "@/utils/Types";
import toast from "react-hot-toast";


const Page: React.FC = () => {
  const router = useRouter()
  
  const Fields: Field[] = [
    {
      type: "text",
      placeholder: "USERNAME",
      Name: "username",
    },
    {
      type: "password",
      placeholder: "PASSWORD",
      Name: "password",
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password:''
  });

  // State to track if the password input should show or hide the password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username) {
      toast.error('Enter username !')
    } else if (!formData.password) {
      toast.error('Enter password !') 
    } else {
      console.log(formData);
      router.push('/')  
    }
    
  };

  return (
    <div className="relative bg-primary h-screen w-screen">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-xl py-12 bg-white w-[95%] rounded-3xl px-5 md:px-10 md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="flex items-center justify-center">
          <Image
            src="/assets/images/Dark_Logo.png"
            alt="logo"
            width={500}
            height={200}
            className="w-[250px]"
            quality={100}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pt-8 relative pb-4">
            {Fields.map((item, ind) => (
              <input
                key={ind}
                type={
                  item.type === "password"
                    ? !showPassword
                      ? item.type
                      : "text"
                    : "text"
                }
                name={item.Name}
                placeholder={item.placeholder}
                value={formData[item.Name]}
                onChange={handleChange}
                className="outline-none w-full mb-5 border-dark_black border-[2px] border-opacity-60 md:placeholder:text-xl placeholder:text-lg placeholder:font-light placeholder:text-dark_black placeholder:text-center pl-5 pr-16 py-2 rounded-3xl"
              />
            ))}
            {Fields.find((field) => field.Name === "password") && formData?.password.length>0&& (
              <button
                type="button"
                onClick={handleShowHidePassword}
                className="text-dark_black absolute mt-[.7rem] right-5 focus:outline-none"
              >
                {showPassword ? <HideEye /> : <ShowEye />}
              </button>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="text-white  w-full bg-dark_black uppercase text-xl text-center py-2 rounded-full shadow-xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
