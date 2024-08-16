import Header from "@/component/common/Header";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";



async function getAllBets () {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/`, {
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
    const bets = data?.Bets;
    console.log(bets, "bets");
    
    return bets;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

async function getAllBetsForAgent(agentId:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/${agentId}`, {
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
    const bets = data.Bets;

    console.log("");
    
    
    return bets;
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
    data = await getAllBets();
  else   
   data = await getAllBetsForAgent(user?.userId)
  
  
  const fieldsHeadings = [
    "Username",
    "Status",
    "Odds",
    "Amount",
    "Match Info",
    "Pick"
  ];  

  const fieldsData = [
    "player",
    "status",
    "odds",
    "amount",
    "match_info",
    "pick"
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

export default page;
