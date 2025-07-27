/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { refreshToken } from "@/utils/auth";
import StatsCard from "@/components/statsCard";

interface Stats {
  sales: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    growth: number;
  };
  orders: {
    today: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
  };
}

export default function DashBoard() {
  const accessToken = localStorage.getItem("accessToken");
  const [stats, setStats] = useState<Stats>({
    sales: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      growth: 0,
    },
    orders: {
      today: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,
    },
    products: {
      total: 0,
      lowStock: 0,
      outOfStock: 0,
    },
    customers: {
      total: 0,
      new: 0,
      returning: 0,
    },
  });
  const [oldStats, setOldStats] = useState<Stats>({
    sales: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      growth: 0,
    },
    orders: {
      today: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,
    },
    products: {
      total: 0,
      lowStock: 0,
      outOfStock: 0,
    },
    customers: {
      total: 0,
      new: 0,
      returning: 0,
    },
  });

  const queryData = async () => {
    try {
      await refreshToken();
      const respone = await axios.get(
        "https://fe-api-training.ssit.company/api/dashboard/stats",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      //wokring
      const newStats = respone.data.data.stats;
      setOldStats(stats);
      setStats(newStats);

      //bugging
      // setOldStats(stats);
      // setStats(respone.data.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      queryData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black flex h-screen p-5">
      <div className=" flex flex-col gap-5 m-10">
        <h1 className="text-white text-2xl font-bold [text-shadow:_0_0_2px_white]">
          Revenue
        </h1>
        <StatsCard
          text="Today Revenue"
          start={oldStats.sales.today}
          end={stats.sales.today}
          suffix="₫"
        />
        <StatsCard
          text="This Week Revenue"
          start={oldStats.sales.thisWeek}
          end={stats.sales.thisWeek}
          suffix="₫"
        />
        <StatsCard
          text="This Month Revenue"
          start={oldStats.sales.thisMonth}
          end={stats.sales.thisMonth}
          suffix="₫"
        />
        <StatsCard
          text="Growth Compare To Last Month"
          start={oldStats.sales.growth}
          end={stats.sales.growth}
          suffix="%"
        />
      </div>

      {/* Order Stats Zone*/}
      <div className="flex-1 m-10 flex flex-col gap-5">
        <h1 className="text-white text-2xl font-bold [text-shadow:_0_0_2px_white]">
          Order Stats
        </h1>
        <div className="flex-1/4  backdrop-blur-md  flex gap-5 rounded-2xl">
          <StatsCard
            text="Today Order"
            start={oldStats.orders.today}
            end={stats.orders.today}
            suffix=""
          />
          <StatsCard
            text="Completed Order"
            start={oldStats.orders.completed}
            end={stats.orders.completed}
            suffix=""
          />
          <StatsCard
            text="Pending Order"
            start={oldStats.orders.pending}
            end={stats.orders.pending}
            suffix=""
          />
          <StatsCard
            text="Cancelled Rate"
            start={(oldStats.orders.today / oldStats.orders.cancelled) * 100}
            end={(stats.orders.today / stats.orders.cancelled) * 100}
            suffix="%"
          />
        </div>
        <div className="flex-3/4"></div>
      </div>
    </div>
  );
}
