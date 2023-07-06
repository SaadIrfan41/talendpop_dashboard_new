"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsPositiveIcon } from "../Icons/icons";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";
export const getTotalActiveAgents = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string
) => {
  try {
    let accessToken: CookieValueTypes = "";
    if (hasCookie("talentPOP_token")) {
      accessToken = getCookie("talentPOP_token");
    }
    // const accessToken = getCookie("talentPOP_token");
    const res = await fetch(
      `http://18.237.25.116:8000/active-agents?client=${
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
    const agents_count = await res.json();
    console.log(agents_count);
    if (res.status === 401) {
      return { message: "Not authenticated" };
    }
    return agents_count;
  } catch (error: any) {
    console.log(error.message);
    return { message: "Internal Server Error" };
  }
};
const TotalActiveAgents = () => {
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
      "total-active-agents",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalActiveAgents(
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
  if (data[0] === "nothing to return") {
    return (
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
        No Data Found
      </p>
    );
  }

  // console.log(data);
  // console.log(data.data[0]?.count_user_id);
  return (
    <>
      {data?.data[0]?.count_user_id || 0}
      <StatsPositiveIcon />
    </>
  );
};

export default TotalActiveAgents;
