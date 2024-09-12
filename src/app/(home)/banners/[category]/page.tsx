"use client";
import Back from "@/component/svg/Back";
import ChevronDown from "@/component/svg/ChevronDown";
import ThreeDots from "@/component/svg/ThreeDots";
import { getBanners } from "@/utils/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = (params: any) => {
  const [banners, setBanners] = useState<[]>([]);
  const [status, setStatus] = useState<string>("active");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async (category: string, status: string) => {
      const bannerData = await getBanners(category, status);
      setBanners(bannerData?.banners);
    };
    fetchData(params.params.category, status);
  }, [status]);
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex gap-2 py-4 items-center">
          <button onClick={() => router.back()}>
            <Back />
          </button>
          <h3 className="dark:text-black text-white text-xl font-semibold capitalize">
            {params.params.category}
          </h3>
        </div>
        <div className="bg-[#1A1A1A] flex pl-4 items-center  dark:bg-onDark dark:border-opacity-30 mb-5 border-opacity-60 border-dark_black rounded-lg border-[1px] relative">
          <select
            name="category"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`outline-none w-full bg-[#1A1A1A] rounded-lg px-3 text-base dark:bg-onDark text-white dark:text-black  text-opacity-40 py-2.5 appearance-none`}
            style={{ paddingRight: "30px" }}
          >
            <option className="text-green-700" value="active">
              active
            </option>
            <option value="inactive">inactive</option>
          </select>
          <span className=" text-white dark:text-black text-opacity-40 p-2">
            <ChevronDown />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        {banners &&
          banners?.map((data: any) => (
            <div className="flex items-center justify-center w-full h-[23vh] relative">
              <Image src={data.url} alt={data.title} fill objectFit="contain" />
              <button className="absolute right-4 top-4 p-1 rounded-full border-2 shadow-sm">
                <ThreeDots className="lucide text-white dark:hover:text-gray-400 lucide-ellipsis-vertical" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
