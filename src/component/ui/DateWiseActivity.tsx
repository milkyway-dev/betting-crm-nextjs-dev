"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { getActivitiesByDateAndPlayer, getDailyActivity } from "@/utils/action";
import Activity from "./Activity";

interface Activity {
  _id: string;
  date: string;
  player: string;
  actvity: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function DailyActivityViewer({
  username,
}: {
  username: string;
}) {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [activityData, setActivityData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await getDailyActivity(username);
        if ("error" in result) {
          setError(result.error);
        } else {
          setActivityData(result);
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  const availableDates = activityData.map((item) =>
    format(parseISO(item.date), "yyyy-MM-dd")
  );

  const selectedActivity = activityData.find(
    (item) => format(parseISO(item.date), "yyyy-MM-dd") === selectedDate
  );

  const player: any = selectedActivity?.player;
  const date: any = selectedActivity?.date;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Daily Activity for {username}</h1>

      <div className="mb-6">
        <label htmlFor="date-select" className="block text-sm font-medium mb-2">
          Select Date:
        </label>
        <input
          type="date"
          id="date-select"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-gray-800 text-white rounded-md px-3 py-2 w-full max-w-xs"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Dates:</h2>
        <ul className="list-disc list-inside">
          {availableDates.map((date, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-blue-400"
              onClick={() => setSelectedDate(date)}
            >
              {format(parseISO(date), "MMMM d, yyyy")}
            </li>
          ))}
        </ul>
      </div>

      {selectedActivity ? (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {format(parseISO(selectedActivity.date), "MMMM d, yyyy")}
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Player ID:</span>{" "}
              {selectedActivity.player}
            </p>
            <p>
              <span className="font-medium">Activities:</span>{" "}
              {selectedActivity.actvity.length}
            </p>
            <p>
              <span className="font-medium">Created:</span>{" "}
              {format(parseISO(selectedActivity.createdAt), "PPpp")}
            </p>
            <p>
              <span className="font-medium">Updated:</span>{" "}
              {format(parseISO(selectedActivity.updatedAt), "PPpp")}
            </p>
            <Activity date={date} player={player} />
          </div>
        </div>
      ) : (
        <p className="text-gray-400"></p>
      )}
    </div>
  );
}
