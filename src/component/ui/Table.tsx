import React from "react";
import Image from "next/image";
import Tabs from "./Tabs";
import { TableProps } from "@/utils/Types";
import SearchBar from "./SearchBar";
import { formatDate } from "@/utils/utils";
import TableThreeDots from "./TableThreeDots";

const Table: React.FC<TableProps> = ({  fieldsHeadings, fieldData, data}) => {
  return (
    <>
      <div className="overflow-x-scroll">
      <div className="flex items-center justify-between">
          {/* <SearchBar /> */}
      </div>
      <div
        className={`bg-[#0E0F0F] dark:bg-white h-[85vh]  p-5 border-[1px]  rounded-b-2xl rounded-bl-2xl rounded-tl-2xl md:rounded-tl-none w-[700px] md:w-auto rounded-r-2xl dark:border-opacity-30 border-[#313131]`}
      >
        <table className="w-full ">
          <thead className="text-white border-b dark:text-black border-[#858585] font-semibold">
            <tr className="text-left">
              {fieldsHeadings.map((item:string, ind:number) => (
                <th className="pb-2" key={ind}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((data:any, ind:number)=>{
               const formattedDate  = formatDate(data?.createdAt);               
             return  <tr key={ind}
              className="text-left font-extralight border-b-[1px] border-white border-opacity-40 dark:border-black dark:border-opacity-30  text-opacity-50 dark:text-black text-white">
            {fieldData.map((field, idx) => {
             switch(field){
              case "username":
                return (
                  <td key={idx} className="flex  items-center pb-3 justify-start space-x-2 pt-6">
                      <div>
                    <Image
                      alt="profile"
                      src={"/assets/images/profile.png"}
                      width={200}
                      height={200}
                      className="w-[30px] border-[2px] border-[#858585] rounded-full"
                    />
                  </div>
                   <span>{(data)[field]}</span>
                  </td>
                ) 
              case "status":
                return (
                  <td key={idx} className="pt-6 pb-3">

                  {data[field] == "Active" ? (
                    <span className="bg-green-700 bg-opacity-30 text-green-500 px-4 py-2 rounded-xl">
                      {data[field]}
                    </span>
                  ) : (
                    <span className="bg-red-700 bg-opacity-30 text-red-500 px-4 py-2 rounded-xl">
                      {data[field]}
                    </span>
                  )}
                  </td>
                  )

                case "createdAt":

                  return (
                    <td key={idx} className="pt-6 pb-3">
                      {formattedDate}
                    </td>
                  )
                  
                case "actions":
                 return (
                     <TableThreeDots />
                   )  
                
                default:
                  return (
                    <td  key={idx} className="pt-6 pb-3">
                      {data[field]}
                    </td>
                  );                
             }

             })}
             </tr>
})}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default Table;
