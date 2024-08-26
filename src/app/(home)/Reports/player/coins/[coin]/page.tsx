import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie} from "@/utils/utils";
import { revalidatePath } from "next/cache";
import Header from "@/component/common/Header";
import SearchBar from "@/component/ui/SearchBar";
import SubordinatesReport from "@/component/ui/SubordinatesReport";
import Back from "@/component/svg/Back";
import { getSubordinatesReport } from "@/utils/action";
import ReportTabs from "../../../ReportTabs";


async function getPlayerTransactions(username: string,searchString:string) {
  let transaction_subordinates: string = `/api/transactions/${username}/players?type=username`;
  if (searchString?.length>0) {
    transaction_subordinates += `&search=${encodeURIComponent(String(searchString))}`;
  }
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}${transaction_subordinates}`, {
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
    const transactions = data;
    return transactions;
  } catch (error) {
  }finally{
    revalidatePath("/");
  }
}

const page = async ({params,searchParams}:any) => {
  const data = await getPlayerTransactions(params?.coin,searchParams?.search)
  const reportData = await getSubordinatesReport(params?.coin)
 
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
    { name: 'Coins', route: `/Reports/player/coins/${params?.coin}` },
    { name: 'Betting', route: `/Reports/player/betting/${params?.coin}` },
  ];
  return (
    <>
     <div
        className="flex-1 h-screen overflow-y-scroll "
      >
        <Header Back={<Back />} />
        <div className="px-4 md:px-10 py-5">
        <SubordinatesReport reportData={reportData} />
          <div className="md:flex items-center justify-between">
            <ReportTabs params={params?.report} tabs={tabs} />
            <div className="md:w-[40%] w-[100%] lg:w-[35%] xl:w-[25%] pb-2">
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
