'use server'
import Header from "@/component/common/Header";
import ArrowDown from "@/component/svg/ArrowDown";
import ArrowUp from "@/component/svg/ArrowUp";
import Card from "@/component/ui/Card";
import RecentBets from "@/component/ui/RecentBets";
import RecentTransaction from "@/component/ui/RecentTransaction";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getSummary(){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/auth/summary`, {
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
    const summary = data.summary;
    console.log(summary, "Summary");
    
    return summary;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}


export default async function Home() {
  const summary = await getSummary();
  const TopCards = [
    {
      Text: "Bets",
      counts: "678",
      percentage: "+7.8",
      arrow: <ArrowUp />,
    },
    {
      Text: "Transactions",
      counts: "679",
      percentage: "-2.8",
      arrow: <ArrowUp />,
    },
    {
      Text: "players",
      counts: "896",
      percentage: "+9.8",
      arrow: <ArrowUp />,
    },
    {
      Text: "Agents",
      counts: "785",
      percentage: "+7.1",
      arrow: <ArrowUp />,
    },
  ];
  return (
    <div className="col-span-12 lg:col-span-9 xl:col-span-10">
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-12 gap-2 xl:w-[92%] md:gap-y-5 xl:gap-y-0  md:gap-x-5 2xl:gap-x-20">
          <Card TopCards={TopCards} />
        </div>
        <div className="grid gap-x-5 items-start xl:w-[92%] grid-cols-1 lg:grid-cols-2 pt-10">
          <RecentTransaction data={summary?.lastTransactions}/>
          <RecentBets data={summary?.lastBets} />
        </div>
      </div>
    </div>
  );
}
