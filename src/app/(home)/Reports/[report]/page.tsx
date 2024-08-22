import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import ReportTabs from "../ReportTabs";
import Header from "@/component/common/Header";

async function getAllPlayersForAgents(username: string) {
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

    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      return { error: error.message };
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

const page = async ({ params }: any) => {

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
        className="flex-1 h-screen overflow-y-scroll "
      >
        <Header />
        <div className="px-10 py-5">
          <div className="flex items-center justify-between">
            <ReportTabs params={params?.report} tabs={tabs} />
            <div className="md:w-[40%] w-[50%] lg:w-[35%] xl:w-[25%] pb-2">
              <SearchBar />
            </div>
          </div>
          <Table Page="Player" fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} />
        </div>
      </div>
    </>
  );
};

export default page;
