'use client'
import { getActivitiesByDateAndPlayer, getBetsAndTransactions } from '@/utils/action'
import { ActivityDetails, ActivityProps } from '@/utils/Types'
import React, { useEffect, useState } from 'react'

const Activity: React.FC<ActivityProps> = ({ player, date }) => {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activityDetails, setActivityDetails] = useState<ActivityDetails>({ bets: [], transactions: [] });


    async function fetchActivity() {
        setLoading(true);
        try {
            const result = await getActivitiesByDateAndPlayer(date, player);
               setActivities(result);
            if ("error" in result) {
                setError(result.error);
            } else {
                setActivities(result);
                setError(null);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActivity();
    }, [date, player]);


 async function fetchActivityDetails(startTime:any, endTime:any, playerId:any){
    const result = await getBetsAndTransactions(startTime, endTime, playerId)
    setActivityDetails(result)    
 }


    return (
        <div className='pb-2'>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {activities.length > 0 ? (
                
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index} onClick={()=>fetchActivityDetails(activity.startTime, activity.endTime, player)}>
                            <p>Start Time: {new Date(activity.startTime).toLocaleTimeString()}</p>
                            <p>End Time: {activity.endTime ? new Date(activity.endTime).toLocaleTimeString() : 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No activities found.</p>
            )}

            Bets:{activityDetails.bets.length}
            Transactions {activityDetails.transactions.length}
        </div>
    );
}

export default Activity;
