import React from "react";
import { UpIcon } from "../Icons/icons";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

export const getTotalInternalMembers = async (
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
      `http://18.237.25.116:8000/total-internal-team-members?${clientQueryParam}&${agentsQueryParam}&${teamLeadQueryParam}&${OM_QueryParam}&${CSM_QueryParam}&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
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

const TotalInternalMembers = () => {
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
      "total-internal-members",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getTotalInternalMembers(
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
  return (
    <>
      {data.data.map((data: any, index: number) => (
        <div key={index}>
          <span className=" text-base font-medium">
            {data["hop.name"] ? data["hop.name"] : "No Name"}
          </span>
          <div className="flex items-center gap-1">
            <span className=" text-lg font-bold">{data.count_user_id}</span>
            <UpIcon />
            <div
              style={{
                background:
                  "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                width:
                  data.count_user_id > 100 ? "100%" : `${data.count_user_id}%`,
              }}
              className={` h-3`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TotalInternalMembers;
