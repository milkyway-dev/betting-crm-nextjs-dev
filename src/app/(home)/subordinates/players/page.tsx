import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getAllPlayers(){  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/player/all`, {
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
  const data = await getAllPlayers();
  
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
        className="col-span-12 lg:col-span-9 xl:col-span-8"
      >
        <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} Page={'player'} />

      </div>
    </>
  );
};

export default page;
