import Header from "@/component/common/Header";
import ArrowUp from "@/component/svg/ArrowUp";
import Card from "@/component/ui/Card";
import DaysWiseReport from "@/component/ui/DaysWiseReport";
import RecentBets from "@/component/ui/RecentBets";
import RecentTransaction from "@/component/ui/RecentTransaction";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getSummary(days:string) {
  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/auth/summary?lastDays=${days}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      }
    })
    

    if (!response.ok) {
      const error = await response.json();
      
      return { error: error.message };
    }

    const data = await response.json();
    const summary = data;
    

    return summary;
  } catch (error) {
    
  } finally {
    revalidatePath("/");
  }
}


export default async function Home({searchParams}:any) {
  const summary = await getSummary(searchParams?.report);
  const user: any = await getCurrentUser()
  const userRole: string = user?.role;
  const TopCards = {
    admin: [
      {
        Text: "Bets",
        counts: formatNumber(summary?.betTotals?.totalLastPeriod),
        arrow: <ArrowUp />,
      },
      {
        Text: "Transactions",
        counts: formatNumber(summary?.transactionTotals?.totalLastPeriod),
        percentage: "-2.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "players",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Subordinates",
        counts: formatNumber(summary?.agentCounts?.agentsLastPeriod),
        percentage: "+7.1",
        arrow: <ArrowUp />,
      },],
    distributor: [
      {
        Text: "Transactions",
        counts: formatNumber(summary?.transactionTotals?.totalLastPeriod),
        percentage: "-2.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Recharged",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Redeemed",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Subordinates",
        counts: formatNumber(summary?.agentCounts?.agentsLastPeriod),
        percentage: "+7.1",
        arrow: <ArrowUp />,
      }],
    subdistributor: [
      {
        Text: "Transactions",
        counts: formatNumber(summary?.transactionTotals?.totalLastPeriod),
        percentage: "-2.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Recharged",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Redeemed",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Subordinates",
        counts: formatNumber(summary?.agentCounts?.agentsLastPeriod),
        percentage: "+7.1",
        arrow: <ArrowUp />,
      }],
    agent: [
      {
        Text: "Bets",
        counts: formatNumber(summary?.betTotals?.totalLastPeriod),
        arrow: <ArrowUp />,
      },
      {
        Text: "Transactions",
        counts: formatNumber(summary?.transactionTotals?.totalLastPeriod),
        percentage: "-2.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Recharged",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Redeemed",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "players",
        counts: formatNumber(summary?.playerCounts?.playersLastPeriod),
        percentage: "+9.8",
        arrow: <ArrowUp />,
      },
      {
        Text: "Subordinates",
        counts: formatNumber(summary?.agentCounts?.agentsLastPeriod),
        percentage: "+7.1",
        arrow: <ArrowUp />,
      },]
  };

  function formatNumber(num: number) {
    if (num) {
      if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
      if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
      return num.toString();
    }

  }
  return (
    <div className="flex-1">
      <Header />
      <div className="p-4">
        <DaysWiseReport />
        <div className="grid pt-3 grid-cols-12 gap-2 xl:w-[92%] md:gap-y-5   md:gap-5 ">
          <Card TopCards={TopCards[userRole as keyof typeof TopCards]} />
        </div>
        <div className="items-start space-y-5 xl:space-y-0 xl:space-x-5  xl:flex  md:w-full pt-10">
          <RecentTransaction  data={summary?.lastTransactions} />
          {summary?.lastBets?.length > 0 && <RecentBets data={summary?.lastBets} />}
        </div>
      </div>
    </div>
  );
}
