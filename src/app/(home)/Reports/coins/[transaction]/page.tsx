import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie} from "@/utils/utils";
import { revalidatePath } from "next/cache";
import ReportTabs from "../../ReportTabs";
import Header from "@/component/common/Header";
import SearchBar from "@/component/ui/SearchBar";
import SubordinatesReport from "@/component/ui/SubordinatesReport";
import Back from "@/component/svg/Back";
import { getSubordinatesReport } from "@/utils/action";


async function getAllTransactions(username:string){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions/${username}/subordinate?type=username`, {
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        Cookie: `userToken=${token}`,
      }
    })
     
    if(!response.ok){
      const error = await response.json();
      return {error:error.message};
    }

    const data = await response.json();
    const transactions = data;
    return transactions;
  } catch (error) {
  }finally{
    revalidatePath("/");
  }
}

const page = async ({params}:any) => {
  const data = await getAllTransactions(params?.transaction)
  const reportData = await getSubordinatesReport(params?.transaction)
 
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
    { name: 'Subordinates', route: `/Reports/${params?.transaction}` },
    { name: 'Coins', route: `/Reports/coins/${params?.transaction}` },
  ];
  return (
    <>
     <div
        className="flex-1 h-screen overflow-y-scroll "
      >
        <Header Back={<Back />} />
        <div className="px-2 md:px-10 py-5">
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
