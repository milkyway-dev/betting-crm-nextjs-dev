import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getAllPlayers(){  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/players/`, {
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

async function getAllPlayersForAgents(agentId:any){  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/agents/${agentId}/players?type=id`, {
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

const page = async () => {
  const user:any = await getCurrentUser();
  let data=[];
  if(user.role==="admin")
    data = await getAllPlayers();
  else   
   data = await getAllPlayersForAgents(user?.userId)
  
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
 
  return (
    <>
      <div
        className="col-span-12 lg:col-span-9 relative xl:col-span-8"
      >
         <div className="md:absolute md:right-[2%] md:-top-[4.4%] pb-3 md:pb-0 md:inline-block">
          <SearchBar />
        </div>
        <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} Page={'Player'} />
      </div>
    </>
  );
};

export default page;
