"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { LowActivityChart } from "../HarizontalBarChart2";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

const getAgentLowActivityReport = async (
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
      `http://18.237.25.116:8000/low-activity-rate-report-agents?client=${
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
const AgentsLowActivityReport = () => {
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
      "agents-low-activity-report",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getAgentLowActivityReport(
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
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920]">
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

  // const agentsName: string[] = data.map((obj: any) => obj["hau.name"]);
  // const activityAvg: number[] = data.map((obj: any) =>
  //   obj["avg_Activity"].toFixed(2)
  // );
  const agentsName: string[] = [];
  const activityAvg: string[] = [];

  data?.forEach((obj: any) => {
    agentsName.push(obj["hau.name"] === null ? "No Name" : obj["hau.name"]);
    activityAvg.push(obj["avg_Activity"].toFixed(2));
  });
  //   console.log(data)
  return <LowActivityChart agentsName={agentsName} activityAvg={activityAvg} />;
};

export default AgentsLowActivityReport;
