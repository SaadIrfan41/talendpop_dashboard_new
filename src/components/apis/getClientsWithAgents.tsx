import React from "react";
import { UpIcon } from "../Icons/icons";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

export const getClienWithAgentsCount = async (
  filterClientName: string[],
  filterAgentsName: string[],
  filterTeamLeadsName: string[],
  filterOMsName: string[],
  filterCSMsName: string[],
  startingDateFilter: string,
  endingDateFilter: string
) => {
  console.log(
    filterClientName,
    filterAgentsName,
    filterCSMsName,
    filterOMsName,
    filterTeamLeadsName
  );
  let accessToken: CookieValueTypes = "";
  if (hasCookie("talentPOP_token")) {
    accessToken = getCookie("talentPOP_token");
  }
  try {
    const res = await fetch(
      `http://18.237.25.116:8000/active-agents-by-client?client=${
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
    console.log("Clients With Gents", data);
    if (res.status === 401) {
      return { message: "Not authenticated" };
    }
    return data;
  } catch (error: any) {
    console.log(error.message);
    return { message: "Internal Server Error" };
  }
};

const ClientsWithAgents = () => {
  const {
    filterClientName,
    filterAgentsName,
    filterTeamLeadsName,
    filterOMsName,
    filterCSMsName,
    startingDateFilter,
    endingDateFilter,
  } = useFiltersStore();
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "clients-with-agents",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getClienWithAgentsCount(
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
      {data.data?.length === 0 ? (
        <p className=" text-base text-[#69C920]">No Data Found</p>
      ) : (
        data.data.map((data: any, index: number) => (
          <div key={index}>
            <span className=" text-base font-medium">
              {data["hop.name"] ? data["hop.name"] : "No Name"}
            </span>
            <div className="flex items-center gap-1">
              <span className=" text-lg font-bold">
                {data.count_hubstaff_all_users}
              </span>
              <UpIcon />
              <div
                style={{
                  background:
                    "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                  width:
                    data.count_hubstaff_all_users > 100
                      ? "100%"
                      : `${data.count_hubstaff_all_users}%`,
                }}
                className={` h-3`}
              />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ClientsWithAgents;
