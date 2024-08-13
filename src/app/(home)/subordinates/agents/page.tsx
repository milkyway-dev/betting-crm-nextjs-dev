import Header from "@/component/common/Header";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export const getAllAgents = async () => {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/agent/all`, {
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        Cookie: `userToken=${token}`,
      }
    })
     
    if(!response.ok){
      const error = await response.json();
      console.log(error);
      
      return {error:error.message};
    }

    const data = await response.json();
    const agents = data.agents;
    
    return agents;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

const Page = async () => {
  const tabs = ["Agents", "Players", "Add"];
  const data = await getAllAgents();
  
  const fieldsHeadings = [
    "Username",
    "Status",
    "Credits",
    "Created At",
    "Actions",
  ];  

  const fieldsData = [
    "username",
    "status",
    "credits",
    "createdAt",
    "actions"
  ]

 
const Tbody= [
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      }
    ]
  

  
  return (
    <>
      <div
        className="col-span-12 lg:col-span-9 xl:col-span-8"
      >
        <Table  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />

      </div>
    </>
  );
};

export default Page;
