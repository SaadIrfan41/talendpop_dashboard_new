"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsNegativeIcon, StatsPositiveIcon } from "../Icons/icons";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

export const getTotalInternalTeamMembers = async (
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
  const clientQueryParam = new URLSearchParams();

  filterClientName.forEach((client) => {
    clientQueryParam.append("client", client);
  });

  const agentsQueryParam = new URLSearchParams();

  filterAgentsName.forEach((agent) => {
    agentsQueryParam.append("agentname", agent);
  });
  const teamLeadQueryParam = new URLSearchParams();

  filterTeamLeadsName.forEach((teamlead) => {
    teamLeadQueryParam.append("teamlead", teamlead);
  });
  const OM_QueryParam = new URLSearchParams();

  filterOMsName.forEach((OM) => {
    OM_QueryParam.append("operationmanager", OM);
  });
  const CSM_QueryParam = new URLSearchParams();

  filterCSMsName.forEach((CSM) => {
    CSM_QueryParam.append("customersuccessmanager", CSM);
  });

  try {
    const res = await fetch(
      `http://18.237.25.116:8000/total-internal-members?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const team_member__count = await res.json();
    if (res.status === 401) {
      return { message: "Not authenticated" };
    }
    return team_member__count;
  } catch (error: any) {
    console.log(error.message);
    return { message: "Internal Server Error" };
  }
};
const TotalInternalTeamMembers = () => {
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
      "total-internal-team-members",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalInternalTeamMembers(
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
    <>
      {data.data[0]?.sum_count_hubstaff_all_users}

      <StatsNegativeIcon />
    </>
  );
};

export default TotalInternalTeamMembers;
