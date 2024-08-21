import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import ReportTabs from "../ReportTabs";

async function getAllPlayersForAgents(username:string){  
  const token = await getCookie();
  try {

    const response = await fetch(`${config.server}/api/agents/${username}/players?type=username`, {
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
    const players = data.players;
    console.log(players);
    
    return players;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

async function getAllTransactionsForAgent(agentId:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions/all/${agentId}`, {
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
    const transactions = data.transactions;

    console.log("");
    
    
    return transactions;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

const page = async({params}:any) => {

  const data = await getAllPlayersForAgents(params?.report)

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
  const tabs = [
    { name: 'Players', route: `/Reports/${params?.report}` },
    { name: 'Coins', route: `/Reports/coins/${params?.report}` },
  ];
  return (
    <>
      <div
        className="col-span-12 p-5 lg:col-span-9 h-screen overflow-y-scroll xl:col-span-8"
      >
        <div className="pb-5 flex items-center space-x-2">
          <div className="text-white font-semibold tracking-wide text-opacity-30">Report Of :</div>
          <div className="text-white font-semibold tracking-wide capitalize">{params?.report}</div>
        </div>
        <ReportTabs params={params?.report} tabs={tabs}/>
        <Table Page="Player" fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data}/>
      </div>
    </>
  );
};

export default page;
