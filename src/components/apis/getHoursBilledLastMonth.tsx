"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";

import { MonthlyBilledClientsChart } from "../MonthlyBilledClientsChart";
import { useFiltersStore } from "@/store/useFiltersStore";
import { format } from "date-fns";
import { RotateCcw, RotateCw } from "lucide-react";

export const getHoursBilledLastMonth = async (
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
      `http://18.237.25.116:8000/hour-billed-per-client-last-month?client=${
        filterClientName[0] || ""
      }&agentname=${filterAgentsName[0] || ""}&teamlead=${
        filterTeamLeadsName[0] || ""
      }&operationmanager=${filterOMsName[0] || ""}&customersuccessmanager=${
        filterCSMsName[0] || ""
      }${startingDateFilter ? `&startdate=${startingDateFilter}` : ""}${
        endingDateFilter ? `&enddate=${endingDateFilter}` : ""
      }`,
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
const HoursBilledLastMonth = () => {
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
      "hours-billed-last-month",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getHoursBilledLastMonth(
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
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
        {data.message}
      </p>
    );
  }
  if (data[0] === "nothing to return") {
    return (
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
        No Data Found
      </p>
    );
  }
  if (data[0] === "Nothing to return") {
    return (
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
        No Data Found
      </p>
    );
  }
  const clientName: string[] = [];
  const billableHrs: string[] = [];

  data?.data?.forEach((obj: any) => {
    clientName.push(obj["hop.name"] === null ? "No Name" : obj["hop.name"]);
    billableHrs.push(obj["summed_hours"].toFixed(2));
  });

  // const clientName: string[] = data.data.map((obj: any) =>
  //   obj["hop.name"] === null ? "No Name" : obj["hop.name"]
  // );
  // const billableHrs: string[] = data.data.map((obj: any) =>
  //   obj["summed_hours"].toFixed(2)
  // );
  //   console.log(clientName, billableHrs)
  return (
    <div className="flex divide-x ">
      <div className="flex max-h-[480px] max-w-[350px] flex-col gap-6 overflow-y-auto pt-4 text-base font-medium">
        {data?.data?.map((data: any, index: number) => (
          //   <div key={index} className='flex gap-16 pl-4 pr-9  '>
          //     <span>{clientName[index]}</span>
          //     <span className=' ml-auto'>{billableHrs[index]}</span>
          //   </div>
          <div key={index} className="flex gap-16 pl-4 pr-9  ">
            <span>
              {data["hop.name"] === null ? "No Name" : data["hop.name"]}
            </span>
            <span className=" ml-auto">{data["summed_hours"].toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className=" mx-auto max-h-[480px] w-full flex-1 overflow-x-scroll ">
        {/* <MyResponsiveBar data={BarsData} /> */}

        <MonthlyBilledClientsChart
          clientName={clientName}
          billableHrs={billableHrs}
        />
      </div>
    </div>
  );
};

export default HoursBilledLastMonth;
