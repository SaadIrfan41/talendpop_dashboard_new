"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";

import { InternalTeamActivityRateChart } from "../InternalTeamActivityRateChart";
import { useFiltersStore } from "@/store/useFiltersStore";
import { RotateCw } from "lucide-react";

const getInternalTeamActivityRate = async (
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
      // 'http://18.237.25.116:8000/internal-team-activity-rate'
      // `http://18.237.25.116:8000/internal-team-activity-rate?client=${
      //   filterClientName[0] || ""
      // }`,
      `http://18.237.25.116:8000/internal-team-activity-rate?client=${"TalentPop - Team leads"}&agentname=${
        filterAgentsName[0] || ""
      }&teamlead=${filterTeamLeadsName[0] || ""}&operationmanager=${
        filterOMsName[0] || ""
      }&customersuccessmanager=${
        filterCSMsName[0] || ""
      }&startdate=${startingDateFilter}&enddate=${endingDateFilter}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
      // {
      //   params: { _page: pageParams },
      // }
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
const InternalTeamActivityRate = () => {
  const {
    filterClientName,
    filterAgentsName,
    filterCSMsName,
    filterOMsName,
    filterTeamLeadsName,
    startingDateFilter,
    endingDateFilter,
  } = useFiltersStore();

  let pageParams: any = 1;
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "internal-team-activity-rate",
      filterClientName,
      filterAgentsName,
      filterTeamLeadsName,
      filterOMsName,
      filterCSMsName,
      startingDateFilter,
      endingDateFilter,
    ],
    queryFn: () =>
      getInternalTeamActivityRate(
        filterClientName,
        filterAgentsName,
        filterTeamLeadsName,
        filterOMsName,
        filterCSMsName,
        startingDateFilter,
        endingDateFilter
      ),
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (isLoading)
    return (
      <p className=" grid h-[400px] w-full place-items-center  text-center text-3xl  font-bold  capitalize text-[#69C920]">
        <span className=" flex items-center gap-2">
          Loading
          <RotateCw className="mr-2 h-8 w-8 animate-spin" />
        </span>
      </p>
    );
  if (error) return <p className=" text-base text-[#69C920]">Error</p>;
  console.log(data);
  // if (data?.pages[0].message === "Not authenticated")
  //   return (
  //     <p className=" text-base text-[#69C920]">Login Credentials Invalid</p>
  //   );
  if (data?.pages[0].message) {
    if (data?.pages[0].message === "Not authenticated")
      return (
        <p className=" text-base text-[#69C920]">Login Credentials Invalid</p>
      );
    return (
      <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
        {data?.pages[0].message}
      </p>
    );
  }
  // if (data?.pages[0] === "nothing to return") {
  //   return (
  //     <p className=" grid h-[400px] place-items-center  text-3xl font-bold capitalize text-[#69C920] ">
  //       No Data Found
  //     </p>
  //   );
  // }

  return (
    <div className=" mx-auto grid grid-cols-3 gap-10 px-8 pt-8">
      {data?.pages.map((group, i: number) => (
        <Fragment key={i}>
          {group.map((item: any) => (
            <div className=" mx-auto" key={item.name}>
              <p className=" font-medium text-[#163143]">{item.name}</p>
              <InternalTeamActivityRateChart
                monthlyAvgActivities={item.monthly_avg_activities}
              />
            </div>
          ))}
        </Fragment>
      ))}
      {/* {isFetchingNextPage ? (
        <div className=' text-red-500'>Loading more...</div>
      ) : hasNextPage ? (
        <button className=' text-red-500 ' onClick={() => fetchNextPage()}>
          Load More
        </button>
      ) : null} */}
    </div>
  );
};

export default InternalTeamActivityRate;
