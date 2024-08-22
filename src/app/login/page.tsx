"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ShowEye from "@/component/svg/ShowEye";
import HideEye from "@/component/svg/HideEye";
import { useRouter } from "next/navigation";
import { DecodeToken, Field, FormData } from "@/utils/Types";
import toast from "react-hot-toast";
import { GetCaptcha, loginUser } from "@/utils/action";
import User from "@/component/svg/User";
import Password from "@/component/svg/Password";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Loader from "@/component/ui/Loader";


const Page: React.FC = () => {
  const [load, setLoad] = useState(false)
  const router = useRouter();
  const [captchaSrc, setCaptchaSrc] = useState("");

  const Fields: Field[] = [
    {
      type: "text",
      placeholder: "User Name",
      Name: "username",
      icon: <User />
    },
    {
      type: "password",
      placeholder: "Password",
      Name: "password",
      icon: <Password />
    },
    {
      type: "text",
      placeholder: "Captcha",
      Name: "captcha",
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    captchaToken: "",
    captcha: "",
  });

  const fetchCaptcha = async () => {
    try {
      const captcha = await GetCaptcha();
      if (captcha) {
        setCaptchaSrc(captcha.responseData?.captcha);
        setFormData((prevState) => ({
          ...prevState,
          captchaToken: captcha.responseData?.token
        }));
      }
    } catch (error: any) {
      console.log(error);

    }
  };
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username) {
      toast.error("Enter username!");
    } else if (!formData.password) {
      toast.error("Enter password!");
    } else {
      try {
        setLoad(true)
        const response = await loginUser(formData);
        if (response?.token) {
          const token = response?.token;
          Cookies.set("token", token);
          const decodedToken = jwtDecode(token) as DecodeToken;
          if (decodedToken && (decodedToken.role === "agent" || decodedToken.role === "admin")) {
            Cookies.set("token", token);
            router.push("/");
            toast.success(response?.message)
          }else if(decodedToken &&(decodedToken.role==="user")){
             toast.error("You Are Not Authorised")
          }else{
            toast.error("Invalid Credentials!")
          }
        } else {
          toast.error(response.error);
          fetchCaptcha();
        }
        setLoad(false)
      } catch (error) {
        setLoad(false)
        toast.error("An unknown error occurred");
        fetchCaptcha();
      }
    }
  };


  return (
    <>
      <div className="relative bg-gradient-to-r from-[#202020] to-[#0A0C0C] h-screen w-screen">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-xl py-12 bg-[#0B0B0B] w-[95%] rounded-3xl px-5 md:px-10 md:w-[60%] lg:w-[40%] xl:w-[30%]">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/Dark_Logo.svg"
              alt="logo"
              width={500}
              height={200}
              className="w-[180px]"
              quality={100}
            />
          </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="pt-8  pb-4">
              {Fields.map((item, ind) => (
                <div
                  key={ind}
                  className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] "
                >
                  {item.icon}
                  <input
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
                    className="outline-none w-full  bg-[#1A1A1A] rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:text-lg placeholder:font-light placeholder:text-white placeholder:text-opacity-50  py-3"
                  />
                  {item.Name == "password" && formData?.password.length > 0 && (
                    <button
                      type="button"
                      onClick={handleShowHidePassword}
                      className="text-white pr-4 focus:outline-none"
                    >
                      {showPassword ? <HideEye /> : <ShowEye />}
                    </button>
                  )}
                  {captchaSrc && item.Name == "captcha" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: captchaSrc }}
                      className="h-full border-[#dfdfdfbc]  bg-[#ffffffc5] rounded-md"
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="text-white  w-full bg-[#69696933] uppercase border text-xl text-center py-2 rounded-xl shadow-xl"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Loader show={load} />
    </>
  );
};

export default Page;
