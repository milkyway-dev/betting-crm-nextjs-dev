import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import SearchBar from "@/component/ui/SearchBar";
import SubordinatesReport from "@/component/ui/SubordinatesReport";
import { getSubordinatesReport } from "@/utils/action";
import ReportTabs from "../../../ReportTabs";
import Modal from "@/component/ui/Modal";
import ResolveButton from "@/component/ui/ResolveButton";
import Sport from "@/component/svg/Sport";
import Bet from "@/component/svg/Bet";
import Market from "@/component/svg/Market";
import Odds from "@/component/svg/odds";
import Amount from "@/component/svg/Amount";
import Status from "@/component/svg/Status";
import Action from "@/component/svg/Action";

async function getPlayerBettings(username: string) {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/bets/${username}/bets?type=username&status=all`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const bets = data;

    // console.log("BETS : ", bets);

    return bets;
  } catch (error) {
  } finally {
    revalidatePath("/");
  }
}

const page = async ({ params }: any) => {
  const data = await getPlayerBettings(params?.betting);
  const reportData = await getSubordinatesReport(params?.betting);

  const tabs = [
    { name: "Coins", route: `/Reports/player/coins/${params?.betting}` },
    { name: "Betting", route: `/Reports/player/betting/${params?.betting}` },
  ];

  const headers = [
    { icon: <Sport />, text: "sport" },
    { icon: <Bet />, text: "Stake" },
    { icon: <Market />, text: "Category" },
    { icon: <Odds />, text: "odds" },
    { icon: <Amount />, text: "Possible Winning" },
    { icon: <Status />, text: "status" },
    { icon: <Action />, text: "action" },
  ];

  return (
    <>
      <div className="flex-1 h-screen overflow-y-scroll ">
        <div className="px-4 md:px-10 py-5">
          <SubordinatesReport reportData={reportData} />
          <div className="md:flex items-center justify-between">
            <ReportTabs params={params?.report} tabs={tabs} />
            <div className="md:w-[40%] w-[100%] lg:w-[35%] xl:w-[25%] pb-2">
              <SearchBar />
            </div>
          </div>
          <div className="h-[calc(100%-13vh)] hideScrollBar border-[1px] border-white dark:border-black dark:border-opacity-10 bg-[#0E0F0F] dark:bg-white border-opacity-10 rounded-2xl overflow-y-scroll">
            <table className="w-[850px] md:w-[calc(100%-2rem)] mx-auto h-auto">
              <thead>
                <tr className="text-xl">
                  {headers.map((item, index) => (
                    <th
                      key={index}
                      className="font-extralight uppercase py-5 border-b-[1px] border-white dark:border-black dark:border-opacity-20 border-opacity-20"
                    >
                      <div className="flex w-full items-center justify-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm md:text-base dark:text-black dark:font-light text-white">
                          {item.text}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data &&
                  data.length > 0 &&
                  data.map((item: any) =>
                    item.betType === "single" ? (
                      item.data.map((data: any, dataIndex: any) => (

                        <tr
                          key={`${item._id}-${dataIndex}-single`}
                          className="text-center font-extralight hover:bg-black dark:hover:bg-gray-100 border-white border-opacity-10">
                          <td className="w-[20%] py-2 md:py-4">
                            <div className="w-full flex flex-col gap-1 px-3">
                              <span
                                className={`text-white font-medium dark:text-black dark:text-opacity-85 text-left text-sm md:text-lg`}
                              >
                                {data.sport_title}
                              </span>
                              <span className="text-[9px]  md:text-[13px] text-left">
                                <span
                                  className={data.bet_on === "home_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                  {data.home_team.name}
                                </span>{" "}
                                <span className="text-white dark:text-black">
                                  v/s
                                </span>{" "}
                                <span
                                  className={data.bet_on === "away_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                  {data.away_team.name}
                                </span>
                              </span>
                              <span
                                className={`text-[9px] md:text-[11px] px-3 py-1.5  border-[1px] border-white dark:border-black dark:border-opacity-30 dark:text-black border-opacity-30 text-white text-opacity-60 rounded-lg w-fit`}
                              >
                                {new Date(data.commence_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} At <span className="text-right">{new Date(data.commence_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                              </span>
                            </div>
                          </td>
                          <td className={`text-white dark:text-black text-sm md:text-lg`}>
                            $ {item.amount}
                          </td>
                          <td
                            className="uppercase text-sm md:text-lg dark:text-black text-white"
                          >
                            {data.market}
                          </td>
                          <td className="text-sm md:text-lg">
                            <div className="flex flex-col gap-2">
                              <span
                                className="text-sm dark:text-black text-white"
                              >
                                {data.oddsFormat}
                              </span>
                              <span
                                className="text-white dark:text-black"
                              >
                                {data.bet_on === "away_team"
                                  ? data.away_team.odds
                                  : data.home_team.odds}
                              </span>
                            </div>
                          </td>
                          <td
                            className="text-sm text-white dark:text-black md:text-lg"
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm font-semibold ${data.status === "lost"
                              ? "text-gray-500"
                              : data.status === "won" ? "text-green-500" : data.status === "pending" ? 'text-yellow-500' : 'text-red-500'
                              } md:text-lg capitalize `}
                          >
                            {data.status}
                          </td>
                          <td className="text-white">
                            {!data.isResolved && data.status === "failed" && (
                              <ResolveButton id={data._id + ""} />
                            )}
                          </td>
                        </tr>

                      ))
                    ) : (
                      <>
                        {item.data.map((data: any, dataIndex: any) => (
                          <tr
                            key={`${item._id}-${dataIndex}-combo`}
                            className={`${dataIndex === 0 ? "border-t-[1px] border-[#f3aa3589]" : ""
                              } text-center font-extralight border-[#f3aa3589] border-[1px] ${dataIndex === item.data.length - 1
                                ? "border-b-[#d8d2d2a3]"
                                : "border-b-[#414141]"
                              }  hover:bg-black dark:hover:bg-gray-100`}
                          >
                            <td className="w-[20%] py-4">
                              <div className="w-full flex flex-col gap-1 px-3">
                                <span
                                  className={`text-white
                                  dark:text-black dark:text-opacity-85
                                  font-medium text-left text-sm md:text-lg`}
                                >
                                  {data.sport_title}
                                </span>
                                <span className="text-[9px]  md:text-[13px] text-left">
                                  <span
                                    className={data.bet_on === "home_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                    {data.home_team.name}
                                  </span>{" "}
                                  <span className="dark:text-black text-white">
                                    v/s
                                  </span>{" "}
                                  <span
                                    className={data.bet_on === "away_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                    {data.away_team.name}
                                  </span>
                                </span>
                                <span
                                className={`text-[9px] md:text-[11px] px-3 py-1.5  border-[1px] border-white dark:border-black dark:border-opacity-30 dark:text-black border-opacity-30 text-white text-opacity-60 rounded-lg w-fit`}
                              >
                                {new Date(data.commence_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} At <span className="text-right">{new Date(data.commence_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                              </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg text-gray-500">
                              --/--
                            </td>
                            <td
                              className={`uppercase text-sm md:text-lg dark:text-black text-white`}
                            >
                              {data.market}
                            </td>
                            <td className="text-sm md:text-lg">
                              <div className="flex flex-col gap-2">
                                <span
                                  className={`text-sm text-white dark:text-black`}
                                >
                                  {data.oddsFormat}
                                </span>
                                <span
                                  className={`text-white dark:text-black`}
                                >
                                  {data.bet_on === "away_team"
                                    ? data.away_team.odds
                                    : data.home_team.odds}
                                </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg text-gray-500">
                              --/--
                            </td>
                            <td
                              className={`text-sm font-semibold ${data.status === "lost"
                                ? "text-gray-500"
                                : data.status === "won" ? "text-green-500 shadow-md" : data.status === "pending" ? 'text-yellow-500' : 'text-red-500'
                                } md:text-lg capitalize `}
                            >
                              {data.status}
                            </td>
                            <td className="text-white">
                              {!data.isResolved && data.status === "failed" && (
                                <ResolveButton id={data._id} />
                              )}
                            </td>
                          </tr>

                        ))}
                        <tr className="text-center font-extralight dark:bg-gradient-to-b dark:from-gray-100 dark:to-gray-100 bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d] border-[1px] border-[#f3aa357c]">
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf text-white dark:text-black
                              `}
                          >
                            $ {item.amount}
                          </td>
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf text-white dark:text-black
                              `}
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm font-semibold ${data.status === "lost"
                              ? "text-gray-500"
                              : data.status === "won" ? "text-green-500 shadow-md" : data.status === "pending" ? 'text-yellow-500' : 'text-red-500'
                              } md:text-lg capitalize `}
                          >
                            {data.status}
                          </td>
                          <td className="text-white">
                          </td>
                        </tr>
                      </>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
