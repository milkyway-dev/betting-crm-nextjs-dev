import { RecentBetsProps } from "@/utils/Types";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import React from "react";

const RecentBets: React.FC<RecentBetsProps> = ({ data }) => {

  return (
    <div className="border-[1px] flex-1 border-[#282828] dark:border-opacity-40 mt-4 md:mt-0 text-white  rounded-3xl">
      <div className="text-white px-6 tracking-wide py-2 m-3 text-[.9rem] md:text-base bg-light_black dark:text-black dark:bg-[#F4F4F4] rounded-3xl inline-block">
        Recent Bets
      </div>
      <div className="lg:h-[44vh] xl:h-[62vh] lg:overflow-y-scroll">
        <div className="grid grid-cols-12 relative gap-5 pt-4 p-4">
          {data?.map((item: any, ind: any) => (
            <div key={ind} className="bg-[#141414] group dark:bg-[#F6F6F6] dark:hover:bg-[#141414] hover:bg-[#F6F6F6] transition-all p-5 rounded-2xl col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
              <div className="flex items-center space-x-2">
                <span className="text-white dark:text-black dark:group-hover:text-white group-hover:text-black  text-lg tracking-wider">
                  {item?.sport_title}
                </span>
                <span className="text-white dark:text-black dark:group-hover:text-white group-hover:text-black text-xl">/</span>
                <span className="text-white group-hover:text-black dark:text-black dark:group-hover:text-white group-hover:text-opacity-50 text-opacity-60 text-sm">
                  {item?.player?.username}
                </span>
              </div>
              <div className="group-hover:text-[#545454] dark:text-black dark:group-hover:text-white dark:group-hover:text-opacity-40 dark:text-opacity-40 text-white text-xs text-opacity-35 tracking-wider pt-[.15rem]">
                {formatDate(item?.updatedAt)}
              </div>
              <div className="space-x-8 pt-5 flex justify-center items-center">
                <div className="flex space-x-5 items-center">
                  <span className={`text-white ${item?.status === 'win'?'text-green-600':'dark:text-black'}  dark:group-hover:text-white group-hover:text-black text-sm pt-1.5`}>
                    {item?.home_team.name}
                  </span>
                  <span className="text-2xl text-white">-</span>
                  <span className={`text-white dark:text-black dark:group-hover:text-white group-hover:text-black  ${item?.status !== 'win'?'text-green-600':'dark:text-black'} text-sm pt-1.5`}>
                    {item?.away_team.name}
                  </span>
                </div>
              </div>
              <div className="text-white  dark:text-black dark:group-hover:text-white group-hover:text-black group-hover:text-opacity-50 text-center pt-2 text-xl text-opacity-40 font-extralight">
                {item.market}
              </div>
              <div className="grid items-center  grid-cols-3 gap-x-2 md:gap-x-6 pt-2">
                <div className="bg-dark_light_black dark:bg-[#E7E7E7] dark:group-hover:bg-dark_light_black group-hover:bg-[#E7E7E7] text-center rounded-lg tracking-wider p-2">
                  <div className="text-white dark:text-black dark:group-hover:text-white group-hover:text-black group-hover:text-opacity-50 text-opacity-30 font-extralight text-base">
                    Bet on
                  </div>
                  <div className="text-white group-hover:text-[#3A3A3A] dark:text-black dark:group-hover:text-white dark:group-hover:text-opacity-35 text-sm  text-opacity-70">
                    {item?.bet_on === "home_team" ? (item?.home_team?.name) : (item?.away_team?.name)}
                  </div>
                </div>
                <div className="bg-dark_light_black dark:bg-[#E7E7E7] dark:group-hover:bg-dark_light_black group-hover:bg-[#E7E7E7] text-center rounded-lg tracking-wider p-2">
                  <div className="text-white dark:text-black dark:group-hover:text-white group-hover:text-black group-hover:text-opacity-50 text-opacity-30 font-extralight text-base">
                    Amount
                  </div>
                  <div className="text-white group-hover:text-[#3A3A3A] dark:text-black dark:group-hover:text-white dark:group-hover:text-opacity-35 text-sm text-opacity-70">
                    {item?.amount}
                  </div>
                </div>
                <div className="bg-dark_light_black dark:bg-[#E7E7E7] dark:group-hover:bg-dark_light_black group-hover:bg-[#E7E7E7] text-center rounded-lg tracking-wider p-2">
                  <div className="text-white dark:text-black dark:group-hover:text-white group-hover:text-black group-hover:text-opacity-50 text-opacity-30 font-extralight text-base">
                    Odds
                  </div>
                  <div className="text-white group-hover:text-[#3A3A3A] dark:text-black dark:group-hover:text-white dark:group-hover:text-opacity-35 text-sm text-opacity-70">
                    {item?.bet_on === 'home_team' ? (item?.home_team?.odds) : (item?.away_team?.odds)}
                  </div>
                </div>

              </div>
              <div className="pt-3">
                <div className="bg-[#1E1E1E] dark:bg-[#3F3F3F] dark:group-hover:bg-[#1E1E1E] group-hover:bg-[#D0D0D0] p-1 grid rounded-lg grid-cols-3 text-center gap-x-5">

                  <div
                    className={`px-5 py-1.5 text-sm rounded-lg inline-block tracking-wide ${item?.status === 'win'
                      ? 'bg-[#101213]'
                      : 'text-opacity-50'
                      }`}
                  >
                    Won
                  </div>
                  <div
                    className={`px-5 py-1.5 text-sm rounded-lg inline-block tracking-wide ${item?.status === 'lose'
                      ? 'bg-[#101213]'
                      : 'text-opacity-50'
                      }`}
                  >
                    Lose
                  </div>
                  <div
                    className={`px-5 py-1.5 text-sm rounded-lg inline-block tracking-wide ${item?.status.includes('pending') || item?.status.includes('locked') || item?.status.includes('retry')
                      ? 'bg-[#101213]'
                      : 'text-opacity-50'
                      }`}
                  >
                    Pending
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className="sticky w-full md:block hidden h-[10%] rounded-3xl bg-gradient-to-t to-transparent dark:from-[#E4E5E5] from-black bottom-0 left-0"></div>
      </div>
    </div>
  );
};

export default RecentBets;
