import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import ReportTabs from "../ReportTabs";
import Header from "@/component/common/Header";
import { config } from "@/utils/config";
import SubordinatesReport from "@/component/ui/SubordinatesReport";
import Back from "@/component/svg/Back";
import { getSubordinatesReport } from "@/utils/action";

async function getAllSubordinates(username:string) {
  const token = await getCookie();
  try {
      const response = await fetch(`${config.server}/api/subordinates/${username}/subordinates?type=username`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
              Cookie: `userToken=${token}`,
          }
      })

      if (!response.ok) {
          const error = await response.json();
          console.log(error);

          return { error: error.message };
      }

      const data = await response.json();
      const all = data;
      return all;
  } catch (error) {
      console.log("error:", error);
  } finally {
      revalidatePath("/");
  }
}

const page = async ({params}:any) => {
  const data = await getAllSubordinates(params?.report);
  const reportData = await getSubordinatesReport(params?.report)
  const fieldsHeadings = [
      "Username",
      "Status",
      "Credits",
      "Role",
      "Created At",
      "Actions",
  ];

  const fieldsData = [
      "username",
      "status",
      "credits",
      "role",
      "createdAt",
      "actions"
  ]

  const tabs = [
    { name: 'Subordinates', route: `/Reports/${params?.report}` },
    { name: 'Coins', route: `/Reports/coins/${params?.report}` },
  ];
  return (
    <>
      <div
        className="flex-1 h-screen overflow-y-scroll "
      >
        <Header Back={<Back />} />
        <div className="px-10 py-5">
          <SubordinatesReport reportData={reportData} />
          <div className="flex items-center justify-between">
            <ReportTabs params={params?.report} tabs={tabs} />
            <div className="md:w-[40%] w-[50%] lg:w-[35%] xl:w-[25%] pb-2">
              <SearchBar />
            </div>
          </div>
          <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} />
        </div>
      </div>
    </>
  );
};

export default page;
