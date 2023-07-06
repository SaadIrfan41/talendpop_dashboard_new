import { useQuery } from "@tanstack/react-query";
// import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RotateCw } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

// const MyResponsivePie = dynamic(() => import("../PieChart"), {
//   ssr: false,
// });
export const getAbandonedLateOntimeShifts = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string
) => {
  let accessToken: CookieValueTypes = "";
  if (hasCookie("talentPOP_token")) {
    accessToken = getCookie("talentPOP_token");
  }
  try {
    const res = await fetch(
      `http://18.237.25.116:8000/abandoned-late-ontime-shifts-by-count?client=${
        filterClientName[0] || ""
      }&agentname=${filterAgentsName[0] || ""}&teamlead=${
        filterTeamLeadsName[0] || ""
      }&operationmanager=${filterOMsName[0] || ""}&customersuccessmanager=${
        filterCSMsName[0] || ""
      }&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (res.status === 401) {
      return { message: "Not authenticated" };
    }
    return data;
  } catch (error: any) {
    console.log(error.message);
    return { message: "Internal Server Error" };
  }
};

const AbandonedLateOntimeShifts = () => {
  const {
    filterClientName,
    filterAgentsName,
    filterCSMsName,
    filterOMsName,
    filterTeamLeadsName,
    startingDateFilter,
    endingDateFilter,
  } = useFiltersStore();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "abandoned-late-ontime-shifts",
      filterClientName,
      filterAgentsName,
      filterCSMsName,
      filterOMsName,
      filterTeamLeadsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getAbandonedLateOntimeShifts(
        filterClientName,
        filterAgentsName,
        filterTeamLeadsName,
        filterOMsName,
        filterCSMsName,
        startingDateFilter,
        endingDateFilter
      ),
  });
  if (isLoading)
    return (
      <p className=" grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]">
        <span className=" flex items-center gap-2">
          <RotateCw className="mr-2 h-8 w-8 animate-spin" />
        </span>
      </p>
    );
  if (error) return <p className=" text-base text-[#69C920]">Error</p>;
  if (data.message) {
    if (data.message === "Not authenticated")
      return (
        <p className=" text-base text-[#69C920]">Login Credentials Invalid</p>
      );
    return (
      <p className=" grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]">
        {data.message}
      </p>
    );
  }

  const areAllZeros = (array: any) => {
    return array.every((value: number) => value === 0);
  };

  const values = [
    data[0].count_late,
    data[0].count_abandoned,
    data[0].count_missed,
    data[0].count_ontime,
  ];
  const dataAvaliable = !areAllZeros(values);

  console.log("Dougnut Data", dataAvaliable);
  const Chartdata = {
    labels: ["Late", "Abandoned", "Missed", "Ontime"],
    datasets: [
      {
        data: [
          data[0].count_late,
          data[0].count_abandoned,
          data[0].count_missed,
          data[0].count_ontime,
        ],
        backgroundColor: ["#398D5B", "#6EF96C", "#1D542C", "#133418"],
        borderColor: ["#398D5B", "#6EF96C", "#1D542C", "#133418"],
        borderWidth: 1,
      },
    ],
  };

  return dataAvaliable ? (
    <Doughnut
      data={Chartdata}
      options={{
        plugins: {
          legend: { display: true, position: "bottom" },
        },
      }}
    />
  ) : (
    <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
      No Data Found
    </p>
  );
};

export default AbandonedLateOntimeShifts;
