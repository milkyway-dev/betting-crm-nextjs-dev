import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie} from "@/utils/utils";
import { revalidatePath } from "next/cache";
import ReportTabs from "../../ReportTabs";
import Header from "@/component/common/Header";


async function getAllTransactionsForAgent(username:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transaction/all/${username}`, {
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

const page = async ({params}:any) => {
 console.log(params,"agents")
  const data = await getAllTransactionsForAgent(params?.agentcoin)
 
  const fieldsHeadings = [
    "Amount",
    "Type",
    "Sender",
    "Receiver",
    "Date",
  ];  

  const fieldsData = [
    "amount",
    "type",
    "sender",
    "receiver",
    "date"
  ]

  const tabs = [
    { name: 'Players', route: `/Reports/${params?.agentcoin}` },
    { name: 'Coins', route: `/Reports/coins/${params?.agentcoin}` },
  ];
  return (
    <>
         <div
        className="flex-1 p-5 h-screen overflow-y-scroll"
      >
        <Header/>
        <ReportTabs params={params?.report} tabs={tabs}/>
        <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data}/>
      </div>
    </>
  );
};

export default page;
