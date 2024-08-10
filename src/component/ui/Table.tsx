import React from "react";
import ThreeDots from "../svg/ThreeDots";
import Image from "next/image";
import Tabs from "./Tabs";
import { TableProps } from "@/utils/Types";
import SearchBar from "./SearchBar";

const Table: React.FC<TableProps> = ({ tabs, tabelData }) => {
  return (
    <div className="px-10 pt-5">
      <div className="flex items-center justify-between">
        <Tabs tabs={tabs} />
        <SearchBar />
      </div>
      <div
        className={`bg-[#0E0F0F] p-5 border-[1px] rounded-b-2xl rounded-r-2xl border-[#313131]`}
      >
        <table className="w-full ">
          <thead className="text-white border-b border-[#858585] font-semibold">
            <tr className="text-left">
              {tabelData?.Thead?.map((item, ind) => (
                <th className="pb-2" key={ind}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabelData?.Tbody?.map((item, ind) => (
              <tr
                key={ind}
                className="text-left font-extralight text-opacity-50 text-white"
              >
                <td className="flex items-center justify-start space-x-2 pt-6">
                  <div>
                    <Image
                      alt="profile"
                      src={"/assets/images/profile.png"}
                      width={200}
                      height={200}
                      className="w-[30px] border-[2px] border-[#858585] rounded-full"
                    />
                  </div>
                  <span>{item?.userName}</span>
                </td>
                <td className="pt-6">
                  {item.Status == "Active" ? (
                    <span className="bg-green-700 bg-opacity-30 text-green-500 px-4 py-2 rounded-xl">
                      {item.Status}
                    </span>
                  ) : (
                    <span className="bg-red-700 bg-opacity-30 text-red-500 px-4 py-2 rounded-xl">
                      {item.Status}
                    </span>
                  )}
                </td>
                <td className="pt-6">{item.Credits}</td>
                <td className="pt-6">{item.TotalBets}</td>
                <td className="pt-6">{item.TotalRecharge}</td>
                <td className="pt-6">{item.TotalReddem}</td>
                <td className="flex pt-6 justify- cursor-pointer group relative">
                  <ThreeDots />
                  <div className="absolute px-3 py-1.5 group-hover:block hidden rounded-lg bg-dark_light_black space-y-1 top-0 text-sm">
                    <button className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg hover:bg-dark_black  w-full block">
                      Edit
                    </button>
                    <button className="text-white text-opacity-60 font-extralight px-2 py-1 rounded-lg hover:bg-dark_black w-full block">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
