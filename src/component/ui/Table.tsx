import React from "react";
import Image from "next/image";
import Tabs from "./Tabs";
import { TableProps } from "@/utils/Types";
import SearchBar from "./SearchBar";
import { formatDate } from "@/utils/utils";
import TableThreeDots from "./TableThreeDots";
import TableUserName from "./TableUserName";
import Report from "./Report";

const Table: React.FC<TableProps> = ({
  fieldsHeadings,
  fieldData,
  data = [],
  Page
}) => {
  return (
    <>
      <div className="overflow-x-scroll uppercase">
        <div className="flex items-center justify-between">
          {/* <SearchBar /> */}
        </div>
        <div
          className={`bg-[#0E0F0F] dark:bg-white  overflow-y-scroll h-[85vh]  p-5 border-[1px]  rounded-b-2xl rounded-bl-2xl rounded-tl-2xl md:rounded-tl-none w-[700px] md:w-auto rounded-r-2xl dark:border-opacity-30 border-[#313131]`}
        >
          {Page === 'player' && <Report />}
          <table className="w-full">
            <thead className="text-white border-b dark:text-black border-[#858585] font-semibold">
              <tr className="text-center">
                {fieldsHeadings.map((item: string, ind: number) => (
                  <th className="pb-2" key={ind}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className=" text-center">
              {data?.map((data: any, ind: number) => {
                const formattedDate = formatDate(data?.createdAt || data?.date);
                return (
                  <tr
                    key={ind}
                    className="text-center font-extralight border-b-[1px] border-white border-opacity-40 dark:border-black dark:border-opacity-30  text-opacity-50 dark:text-black text-white"
                  >
                    {fieldData.map((field, idx) => {
                      const date = field === "createdAt" ? "createdAt" : "date";
                      const active = field === "type" ? "type" : "status";
                      switch (field) {
                        case "username":
                          return (<TableUserName username={data[field]} Id={data?._id} index={idx} />);
                        case active:
                          return (
                            <td key={idx} className="pt-6 pb-3">
                              {["active", "recharge"].includes(data[field]) ? (
                                <span className="bg-green-700 bg-opacity-30 text-green-500 px-4 py-2 rounded-xl">
                                  {data[field]}
                                </span>
                              ) : ["redeem", "inactive"].includes(
                                  data[field]
                                ) ? (
                                <span className="bg-red-700 bg-opacity-30 text-red-500 px-4 py-2 rounded-xl">
                                  {data[field]}
                                </span>
                              ) : (
                                <span className="bg-gray-700 bg-opacity-30 text-gray-500 px-4 py-2 rounded-xl">
                                  {data[field]}
                                </span>
                              )}
                            </td>
                          );

                        case date:
                          return (
                            <td key={idx} className="pt-6">
                              {formattedDate}
                            </td>
                          );

                        case "sender":
                        case "receiver":
                          return (
                            <td key={idx} className="pt-6">
                              {data[field] ? data[field].username : "N/A"}
                            </td>
                          );

                        case "actions":
                          return <TableThreeDots data={data} />;

                        default:
                          return (
                            <td key={idx} className="pt-6">
                              {data[field]}
                            </td>
                          );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
