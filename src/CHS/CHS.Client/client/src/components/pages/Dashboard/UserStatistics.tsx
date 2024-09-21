"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bar } from "react-chartjs-2";
import { Statistics } from "@/entities/Statistics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "@/lib/utils/session";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UserStatistics() {
  const [selectedStatistic, setSelectedStatistic] = useState(
    Statistics.PostAmountHistory
  );
  const [data, setData] = useState<any>(null);

  const session = useSession();

  useEffect(() => {
    // Fetch data from the backend based on the selected statistic
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/statistics?typeOfStat=${selectedStatistic}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json-patch+json",
          },
          body: JSON.stringify({
            userId: session.session?.user.UserId,
            name: session.session?.user.Name,
            email: session.session?.user.Email,
            password: session.session?.user.Password,
            createdOn: session.session?.user.CreatedOn,
          }),
        }
      );
      const result = await response.json();

      setData(result);
      console.log(result);
    }
    fetchData();
  }, [selectedStatistic]);

  const chartData = {
    labels: data ? data.labels : [],
    datasets: [
      {
        label: selectedStatistic,
        data: data ? data.values : [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex flex-col h-full items-center gap-3">
      <h1 className="text-bold">Statistikker</h1>
      <article className="bg-slate-400 rounded-md border w-full h-full flex flex-col">
        <nav className="flex justify-center gap-3 md:p-2">
          <Button
            className="p-3 bg-background text-foreground hover:bg-gray-300 hover:text-gray-800"
            onClick={() => setSelectedStatistic(Statistics.PostAmountHistory)}
          >
            Global Opslag
          </Button>
          <Button
            className="p-3 bg-background text-foreground hover:bg-gray-300 hover:text-gray-800"
            onClick={() =>
              setSelectedStatistic(Statistics.UserPostAmountHistory)
            }
          >
            Mine opslag
          </Button>
        </nav>
        <div className="p-4 flex-grow">
          {data ? (
            data.values && data.values.length > 0 ? (
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            ) : (
              <p className="text-red-500 text-bold">
                Vi kunne ikke finde data på {selectedStatistic}.
              </p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </article>
    </section>
  );
}
