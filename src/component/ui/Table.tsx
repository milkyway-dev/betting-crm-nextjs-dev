import React from "react";
import ThreeDots from "../svg/ThreeDots";
import Image from "next/image";
import Tabs from "./Tabs";
import { TableProps } from "@/utils/Types";
import SearchBar from "./SearchBar";
import { formatDate } from "@/utils/utils";

const Table: React.FC<TableProps> = ({  fieldsHeadings, fieldData, data}) => {
  return (
    <div className="px-10 pt-5">
      <div className="flex items-center justify-between">
          {/* <SearchBar /> */}
      </div>
      <div
        className={`bg-[#0E0F0F] p-5 border-[1px] rounded-b-2xl rounded-r-2xl border-[#313131]`}
      >
        <table className="w-full ">
          <thead className="text-white border-b border-[#858585] font-semibold">
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
              className="text-left font-extralight text-opacity-50 text-white">
            {fieldData.map((field, idx) => {
             switch(field){
              case "username":
                return (
                  <td key={idx} className="flex items-center justify-start space-x-2 pt-6">
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
                  <td key={idx} className="pt-6">

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
                    <td key={idx} className="pt-6">
                      {formattedDate}
                    </td>
                  )  
                default:
                  return (
                    <td  key={idx} className="pt-6">
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
  );
};

export default Table;
