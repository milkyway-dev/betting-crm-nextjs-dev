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
    { text: "sport" },
    { text: "bet" },
    { text: "market" },
    { text: "odds" },
    { text: "amount won" },
    { text: "status" },
    { text: "action" },
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
          <div className="h-[calc(100%-13vh)] hideScrollBar border-[1px] border-[#484848] rounded-2xl overflow-y-scroll">
            <table className="w-[750px] md:w-[calc(100%-2rem)] mx-auto h-auto">
              <thead>
                <tr className="text-xl">
                  {headers.map((item, index) => (
                    <th
                      key={index}
                      className="font-extralight uppercase py-5 border-b-[1px] border-b-[#484848]"
                    >
                      <div className="flex w-full items-center justify-center gap-2">
                        {/* <span>{item.icon}</span> */}
                        <span className="text-sm md:text-base text-slate-400">
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
                          className={`text-center font-extralight  border-[#414141] 
${data.status === "redeem"
                              ? "bg-[#121216] dark:bg-slate-50"
                              : " bg-gradient-to-b from-[#1c1a2176] dark:from-slate-100 to-[#0d0c156d] dark:to-slate-200"
                            } border-t-[1px]  `}
                        >
                          <td className="w-[20%] py-2 md:py-4">
                            <div className="w-full flex flex-col gap-1 px-3">
                              <span
                                className={`${data.status === "redeem"
                                  ? "text-[#55545a]"
                                  : "text-white dark:text-black"
                                  } font-medium  text-left text-sm md:text-lg`}
                              >
                                {data.sport_title}
                              </span>
                              <span className="text-[9px]  md:text-[13px] text-left">
                                <span
                                  className={
                                    data.bet_on === "home_team"
                                      ? `${data.status === "redeem"
                                        ? "text-white "
                                        : "text-[#FFC400]"
                                      }`
                                      : `${data.status === "redeem"
                                        ? "text-slate-400"
                                        : "text-white dark:text-black"
                                      }`
                                  }
                                >
                                  {data.home_team.name}
                                </span>{" "}
                                <span
                                  className={
                                    data.status === "redeem"
                                      ? "text-[#424149]"
                                      : "text-white dark:text-black"
                                  }
                                >
                                  v/s
                                </span>{" "}
                                <span
                                  className={
                                    data.bet_on === "away_team"
                                      ? `${data.status === "redeem"
                                        ? "text-white"
                                        : "text-[#FFC400]"
                                      }`
                                      : `${data.status === "redeem"
                                        ? "text-[#424149]"
                                        : "text-white dark:text-black"
                                      }`
                                  }
                                >
                                  {data.away_team.name}
                                </span>
                              </span>
                              <span
                                className={`text-[9px] md:text-[11px] p-1  border-[1px] ${data.status === "redeem"
                                  ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                  : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                                  }  rounded-lg w-fit`}
                              >
                                {data.commence_time}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`${data.status === "redeem"
                              ? "text-white"
                              : "text-white dark:text-black"
                              } text-sm md:text-lg`}
                          >
                            $ {item.amount}
                          </td>
                          <td
                            className={`uppercase text-sm md:text-lg ${data.status === "redeem"
                              ? "text-[#555458]"
                              : "text-white dark:text-black"
                              }`}
                          >
                            {data.market}
                          </td>
                          <td className="text-sm md:text-lg">
                            <div className="flex flex-col gap-2">
                              <span
                                className={`${data.status === "redeem"
                                  ? "text-[#403f4b]"
                                  : "text-gray-400"
                                  } text-sm`}
                              >
                                {data.oddsFormat}
                              </span>
                              <span
                                className={`${data.status === "redeem"
                                  ? "text-[#555458]"
                                  : "text-white dark:text-black"
                                  }`}
                              >
                                {data.bet_on === "away_team"
                                  ? data.away_team.odds
                                  : data.home_team.odds}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`${data.status === "redeem"
                              ? "text-[#555458]"
                              : "text-white dark:text-black"
                              } text-sm md:text-lg`}
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm ${data.status === "redeem"
                              ? "text-gray-500"
                              : "text-[#FF6A00]"
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
                            className={`${dataIndex === 0 ? "border-t-[1px]" : ""
                              } text-center font-extralight border-[#f3aa3589] border-x-[1px] border-b-[1px] ${dataIndex === item.data.length - 1
                                ? "border-b-[#d8d2d2a3]"
                                : "border-b-[#414141]"
                              }  hover:bg-[#8585851A] ${data.status === "redeem"
                                ? "bg-[#121216]"
                                : " bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]"
                              }`}
                          >
                            <td className="w-[20%] py-4">
                              <div className="w-full flex flex-col gap-1 px-3">
                                <span
                                  className={`${data.status === "redeem"
                                    ? "text-[#55545a]"
                                    : "text-white dark:text-black"
                                    } font-medium text-left text-sm md:text-lg`}
                                >
                                  {data.sport_title}
                                </span>
                                <span className="text-[10px] md:text-[13px] text-left">
                                  <span
                                    className={
                                      data.bet_on === "home_team"
                                        ? `${data.status === "redeem"
                                          ? "text-[#57555f]"
                                          : "text-[#FFC400]"
                                        }`
                                        : `${data.status === "redeem"
                                          ? "text-[#424149]"
                                          : "text-white dark:text-black"
                                        }`
                                    }
                                  >
                                    {data.home_team.name}
                                  </span>{" "}
                                  <span
                                    className={
                                      data.status === "redeem"
                                        ? "text-[#424149]"
                                        : "text-white dark:text-black"
                                    }
                                  >
                                    v/s
                                  </span>{" "}
                                  <span
                                    className={
                                      data.bet_on === "away_team"
                                        ? `${data.status === "redeem"
                                          ? "text-[#57555f]"
                                          : "text-[#FFC400]"
                                        }`
                                        : `${data.status === "redeem"
                                          ? "text-[#424149]"
                                          : "text-white dark:text-black"
                                        }`
                                    }
                                  >
                                    {data.away_team.name}
                                  </span>
                                </span>
                                <span
                                  className={`text-[9px] md:text-[11px] p-1 ${data.status === "redeem"
                                    ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                    : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                                    } border-[1px]  rounded-lg w-fit`}
                                >
                                  {data.commence_time}
                                </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg text-gray-500">
                              --/--
                            </td>
                            <td
                              className={`uppercase text-sm md:text-lg ${data.status === "redeem" ? "text-[#555458]" : "text-white"
                                }`}
                            >
                              {data.market}
                            </td>
                            <td className="text-sm md:text-lg">
                              <div className="flex flex-col gap-2">
                                <span
                                  className={`text-sm ${data.status === "redeem"
                                    ? "text-[#403f4b]"
                                    : "text-gray-400"
                                    }`}
                                >
                                  {data.oddsFormat}
                                </span>
                                <span
                                  className={`${data.status === "redeem"
                                    ? "text-[#555458]"
                                    : "text-white dark:text-black"
                                    }`}
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
                              className={`text-sm ${data.status === "redeem"
                                ? "text-gray-500"
                                : "text-[#FF6A00]"
                                }  md:text-lg capitalize `}
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
                        <tr className="text-center font-extralight bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d] border-[1px] border-[#f3aa357c]">
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf ${item.status === "redeem"
                              ? "text-[#55545a]"
                              : "text-white dark:text-black"
                              }`}
                          >
                            $ {item.amount}
                          </td>
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf ${item.status === "redeem"
                              ? "text-[#55545a]"
                              : "text-white dark:text-black"
                              }`}
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm ${item.status === "redeem"
                              ? "text-gray-500"
                              : "text-[#FF6A00]"
                              } py-3 md:text-lg capitalize `}
                          >
                            {item.status}
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
