'use client'

// import DateWiseActivity from "@/component/ui/DateWiseActivity";
// import { getDailyActivity } from "@/utils/action";
import { config } from "@/utils/config";
import { formatDate, getCookie } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page =  ({ params }: any) => {
    const [activityData, setActivityData] = useState<any[]>([]);
    const activityParam = params?.activity;
   
    const getDailyActivityData = async ()=>{
    const activityData = await getDailyActivity(activityParam);
      setActivityData(activityData)
    }

    async function getDailyActivity(username:string) {
    
        const token = await getCookie();
        try {
          const response = await fetch(`${config.server}/api/userActivities/${username}`, {
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
        
          return data;
      
        } catch (error) {
        }
    }
     useEffect(()=>{
        getDailyActivityData()
    }, [])

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [data, setData] = useState<any>(null);
    const router = useRouter()

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDate(e.target.value);        
    };
    return (
        <div className="flex-1 h-screen overflow-y-scroll">
            <div className="px-4 md:px-10 py-5">
            <div className='pb-2'>
            <select
                className="cursor-pointer outline-none mr-auto max-w-[180px] bg-black dark:bg-gray-200 dark:text-black text-white border-[1px] border-gray-300 dark:border-gray-300 text-sm rounded-lg block w-full p-[.5rem] dark:placeholder-gray-400"
                value={selectedDate}
                onChange={handleDateChange}
            >
                <option value="" disabled>Select a date</option>
                {activityData?.map((dailyActivity: any) => (
                    <option key={dailyActivity?.date} value={dailyActivity?.date}>
                        {formatDate(dailyActivity?.date)}
                    </option>
                ))}
            </select>
            {data && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Activity for {formatDate(data.date)}</h2>
                    {/* Render your fetched data here */}
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>            </div>
        </div>
    );
};

export default Page;
