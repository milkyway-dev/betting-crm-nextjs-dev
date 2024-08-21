import React from "react";
import { TableProps } from "@/utils/Types";
import { formatDate } from "@/utils/utils";
import TableThreeDots from "./TableThreeDots";
import TableUserName from "./TableUserName";

const Table: React.FC<TableProps> = ({
  fieldsHeadings,
  fieldData,
  data = [],
  Page
}) => {
  return (
    <>
      <div className="capitalize pb-5">
        <div
          className={`bg-[#0E0F0F] dark:bg-white    p-5 border-[1px]  rounded-b-2xl rounded-bl-2xl rounded-tl-2xl md:rounded-tl-none  rounded-r-2xl dark:border-opacity-30 border-[#313131]`}
        >
          <table className="w-full">
            <thead className="text-white border-b dark:text-black border-[#858585] font-semibold">
              <tr>
                {fieldsHeadings.map((item: string, ind: number) => (
                  <th className={`${item==='Created At'?'hidden xl:block ':''} ${item==='Match Info'?'hidden xl:block ':''} ${item==='Username'?'text-start':'text-center'} text-[.8rem] md:text-base pb-2`} key={ind}>
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
                    className="text-center text-[.8rem] md:text-base font-extralight border-b-[1px] border-white border-opacity-10 dark:border-black dark:border-opacity-30  text-opacity-50 dark:text-black text-white"
                  >
                    {fieldData.map((field, idx) => {
                      const date = field === "createdAt" ? "createdAt" : "date";
                      const active = field === "type" ? "type" : "status";
                      switch (field) {
                        case "username":
                          return (<TableUserName Page={Page} username={data[field]} Id={data?._id} index={idx} />);
                        case active:
                          return (
                            <td key={idx} className="pt-6 pb-3">
                              {["active", "recharge", "Success"].includes(data[field]) ? (
                                <span className="bg-green-700 bg-opacity-30 text-green-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2 rounded-xl">
                                  {data[field]}
                                </span>
                              ) : ["redeem", "inactive", "fail"].includes(
                                  data[field]
                                ) ? (
                                <span className="bg-red-700 bg-opacity-30 text-red-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2  rounded-xl">
                                  {data[field]}
                                </span>
                              ) : (
                                <span className="bg-yellow-700 bg-opacity-30 text-yellow-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2  rounded-xl">
                                  {data[field]}
                                </span>
                              )}
                            </td>
                          );

                        case date:
                          return (
                            <td key={idx} className={`pt-6   ${date === "createdAt" ? "hidden xl:inline-block": ""}`}>
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
                        
                          case "odds":
                            return (
                              <td key={idx} className="pt-6">
                                {data.bet_on === "home_team"
                                  ? data.home_team.odds
                                  : data.away_team.odds}
                              </td>
                            );

                          case "match_info":
                          return (
                            <td key={idx} className="pt-6 md:inline-block hidden">
                              {`${data.home_team.name} vs ${data.away_team.name}`}
                            </td>
                          );  

                          case "pick":
                            return (
                              <td key={idx} className="pt-6">
                                {data.bet_on === "home_team"
                                  ? data.home_team.name
                                  : data.away_team.name}
                              </td>
                            );     
                       
                          case "player":
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
