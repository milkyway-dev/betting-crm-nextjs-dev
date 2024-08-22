import Header from "@/component/common/Header";
import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";



async function getAllTransactions () {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions/`, {
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
    
    return transactions;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

async function getAllTransactionsForAgent(agentId:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions/${agentId}/players?type=id`, {
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


const page = async () => {
  const user:any = await getCurrentUser();
  console.log(user);
  let data;
  if(user.role==="admin")
    data = await getAllTransactions();
  else   
   data = await getAllTransactionsForAgent(user?.userId)
  
  
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

  return (
    <>
      <div
        className="md:relative"
      >
        <div className="md:absolute md:right-[2%] md:-top-[7%] pb-3 md:pb-0 md:inline-block">
          <SearchBar />
        </div>
        <Table  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />
      </div>
    </>
  );
};

export default page;
