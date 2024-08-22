import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllAgents() {  

  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/agents/`, {
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

const page = async () => {
  const user:any = await getCurrentUser()
  if (user?.role === "agent") {
    redirect('/'); 
  }

  const data = await getAllAgents() || [];
  
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
    "actions",
  ]
 
  return (
    <>
      <div
        className="flex-1  md:relative"
      >
        <div className="md:absolute md:right-[2%] md:-top-[22%] pb-3 md:pb-0 md:inline-block">
          <SearchBar />
        </div>
        <Table Page="agent"  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />
      </div>
    </>
  );
};

export default page;
