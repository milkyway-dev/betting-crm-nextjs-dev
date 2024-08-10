import Header from "@/component/common/Header";
import ArrowDown from "@/component/svg/ArrowDown";
import ArrowUp from "@/component/svg/ArrowUp";
import Card from "@/component/ui/Card";
import RecentBets from "@/component/ui/RecentBets";
import RecentTransaction from "@/component/ui/RecentTransaction";

export default function Home() {
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
      arrow: <ArrowDown />,
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
          <RecentTransaction />
          <RecentBets />
        </div>
      </div>
    </div>
  );
}
