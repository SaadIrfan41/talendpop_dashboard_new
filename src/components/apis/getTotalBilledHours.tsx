"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StatsNegativeIcon, StatsPositiveIcon } from "../Icons/icons";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

export const getTotalBilledHours = async (
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
      `http://18.237.25.116:8000/total-billed-hours?client=${
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
const TotalBilledHours = () => {
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
      "total-billed-hours-count",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalBilledHours(
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
      <p className=" text-base capitalize text-[#69C920]">
        <span className=" flex items-center gap-2">
          Loading
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
        </span>
      </p>
    );
  if (error) return <p className=" text-base text-[#69C920]">Error</p>;
  if (data.message) {
    if (data.message === "Not authenticated")
      return (
        <p className=" text-base text-[#69C920]">Login Credentials Invalid</p>
      );
    return <p className=" text-base text-[#69C920]">{data.message}</p>;
  }

  return (
    <div className="flex items-center ">
      {data?.total_hours?.toFixed(2) || 0}

      <StatsNegativeIcon />
    </div>
  );
};

export default TotalBilledHours;
