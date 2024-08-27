import React from "react";
import { TableProps } from "@/utils/Types";
import { formatDate, getCurrentUser, rolesHierarchy } from "@/utils/utils";
import TableThreeDots from "./TableThreeDots";
import TableUserName from "./TableUserName";

const Table: React.FC<TableProps> = async({
  fieldsHeadings,
  fieldData,
  data = [],
}) => {

  

  const user: any = await getCurrentUser();
  const userRole: string = user?.role;
  let tabs = await rolesHierarchy(userRole)

  return (
    <>
      <div className="bg-[#0E0F0F]  overflow-x-scroll capitalize dark:bg-white pb-5">
        <div
          className={` dark:bg-white  p-5 border-[1px]  min-w-[460px] md:w-full rounded-b-2xl rounded-bl-2xl rounded-tl-2xl md:rounded-tl-none  rounded-r-2xl dark:border-opacity-30 border-[#313131]`}
        >
          <table className="w-full ">
            <thead className="text-white border-b dark:text-black border-[#858585] font-semibold">
              <tr>
                {fieldsHeadings.map((item: string, ind: number) => (
                  <th className={`${item==='Created At'?'hidden xl:block ':''} ${item==='Match Info'?'hidden xl:block ':''} ${item==='Status'?'hidden xl:block ':''} ${item==='Username'?'text-start':'text-center'} text-[.8rem] md:text-base pb-2`} key={ind}>
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
                    className="text-center hover:bg-black dark:hover:bg-gray-200 transition-all text-[.8rem] md:text-base font-extralight border-b-[1px] border-white border-opacity-10 dark:border-black dark:border-opacity-30  text-opacity-50 dark:text-black text-white"
                  >
                    {fieldData.map((field, idx) => {
                      const date = field === "createdAt" ? "createdAt" : "date";
                      const active = field === "type" ? "type" : "status";
                      switch (field) {
                        case "username":
                          return (<TableUserName role={data?.role} username={data[field]} Id={data?._id} index={idx} />);
                        case active:
                          return (
                            <td key={idx} className={`pt-4 ${field === "status" ? "hidden xl:inline-block": ""} pb-3`} >
                              {["active", "recharge", "Success"].includes(data[field]) ? (
                                <span className="bg-green-700 bg-opacity-30 dark:bg-opacity-100  text-green-500 dark:bg-green-200 dark:text-green-600 dark:font-semibold w-[80px] md:w-[100px] inline-block py-1.5 md:py-2 rounded-xl">
                                  {data[field]}
                                </span>
                              ) : ["redeem", "inactive", "fail"].includes(
                                  data[field]
                                ) ? (
                                <span className="bg-red-700 bg-opacity-30  dark:bg-opacity-100   dark:bg-red-200 dark:text-red-600 dark:font-semibold text-red-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2  rounded-xl">
                                  {data[field]}
                                </span>
                              ) : (
                                <span className="bg-yellow-700 bg-opacity-30 text-yellow-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2  rounded-xl">
                                  {data[field]}
                                </span>
                              )}
                            </td>)
                          

                        case date:
                          return (
                            <td key={idx} className={`pt-7   ${date === "createdAt" ? "hidden xl:inline-block": ""}`}>
                              {formattedDate}
                            </td>
                          );

                        case "sender":
                        case "receiver":
                          return (
                            <td key={idx} className="pt-4">
                              {data[field]}
                            </td>
                          );
                        
                          case "odds":
                            return (
                              <td key={idx} className="pt-4">
                                {data.data[0]?.bet_on === "home_team"
                                  ? data.data[0]?.home_team?.odds
                                  : data.data[0]?.away_team?.odds}
                              </td>
                            );

                          case "match_info":
                          return (
                            <td key={idx} className="pt-4 xl:inline-block hidden">
                              {`${data.data[0]?.home_team?.name} vs ${data.data[0]?.away_team?.name}`}
                            </td>
                          );  

                          case "pick":
                            return (
                              <td key={idx} className="pt-4">
                                {data.data[0]?.bet_on === "home_team"
                                  ? data.data[0]?.home_team?.name
                                  : data.data[0]?.away_team?.name}
                              </td>
                            );     
                       
                          case "player":
                            return (
                              <td key={idx} className="pt-4">
                                {data[field] ? data[field].username : "N/A"}
                              </td>
                            );
                            case "actions":
                          return <TableThreeDots data={data} isDisable={tabs?.includes(data?.role)} />;
                        default:
                          return (
                            <td key={idx} className="pt-4">
                              {typeof data[field] === 'number' ? Math.round(data[field]) : data[field]}
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
