'use client'

import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/utils';
import { useRouter } from 'next/navigation'

export default function DateWiseActivity({ activityData }: { activityData: any[] }) {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [data, setData] = useState<any>(null);
    const router = useRouter()

    useEffect(() => {
        if (selectedDate) {
            // Find the activity data for the selected date
            const selectedActivity = activityData.find(activity => activity.date === selectedDate);
            setData(selectedActivity);
        }
    }, [selectedDate, activityData]);

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDate(e.target.value);        
    };

    return (
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
        </div>
    );
}










