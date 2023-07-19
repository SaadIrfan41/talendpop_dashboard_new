"use client";
import { useMenuStore } from "@/store/useMenuStore";
import { ChevronDownIcon, ExpandIcon } from "lucide-react";
import React from "react";
import { SettingIcon } from "./Icons/icons";
import { HorizontalBarTest } from "./HorizontalBarChartTest";
import { VerticalBartChartTest } from "./VerticalBarChart";

const GlobalPerformance = () => {
  const { reportingMenu } = useMenuStore();

  return (
    <div>
      {reportingMenu === 2 && (
        <section className="rounded-b-2xl rounded-tr-2xl border bg-white px-7  pb-20 pt-11">
          {/* # of Tickets Closed by Agent  */}
          <div className="  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                # of Tickets Closed by Agent
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>{" "}
          {/* Avg. First Response Time  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                Avg. First Response Time
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>{" "}
          {/* Avg. Resolution Time By Agent  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                Avg. Resolution Time By Agent
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>{" "}
          {/* Messages Sent By Agent   */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                Messages Sent By Agent{" "}
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>{" "}
          {/* One-Touch Ticket % By Agent  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                One-Touch Ticket % By Agent
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>{" "}
          {/* First Response Time by Client  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                First Response Time by Client
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>
          {/* Avg CSAT Score  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">Avg CSAT Score</h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>
          {/* AGENTS ACTIVITY REPORT */}
          <div className="grid  grid-cols-2 gap-10  ">
            {/* Rolling Avg CSAT Score  */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  Rolling Avg CSAT Score (Agents)
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">Rolling Avg CSAT Score</span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
            {/* Rolling Avg. First Response Time by Client */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  Rolling Avg. First Response Time by Client
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">
                    Rolling Avg. First Response Time by Client
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
          </div>
          {/* AGENTS ACTIVITY REPORT */}
          <div className="grid  grid-cols-2 gap-10  ">
            {/* One-Touch Ticket % By Account  */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  One-Touch Ticket % By Account
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">
                    One-Touch Ticket % By Account
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
            {/* Rolling Avg. Messages Sent By Agent  */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  Rolling Avg. Messages Sent By Agent
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">
                    Rolling Avg. Messages Sent By Agent
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
          </div>
          {/* AGENTS ACTIVITY REPORT */}
          <div className="grid  grid-cols-2 gap-10  ">
            {/* Rolling Avg. Resolution Time  */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  Rolling Avg. Resolution Time
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">
                    Rolling Avg. Resolution Time
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
            {/* Rolling Avg. Messages Sent By Agent  */}
            <div className=" mt-10   min-h-[500px] overflow-y-auto rounded-2xl  border text-[#163143] ">
              <div className="flex items-center px-4 py-4 ">
                <h3 className=" text-base font-extrabold">
                  Rolling Avg. First Response Time
                </h3>
                <div className="ml-auto flex items-center gap-3">
                  <ExpandIcon />
                  <SettingIcon />
                </div>
              </div>
              <div className=" h-[2px] w-full bg-[#EFEFEF]" />
              <div className="flex   gap-4 py-4">
                <div className=" flex items-center gap-4 pl-3">
                  <div
                    style={{
                      background:
                        "linear-gradient(90.26deg, #163143 -24.85%, #69C920 80.53%)",
                    }}
                    className="h-[8px] w-[21px] "
                  />
                  <span className=" font-medium">
                    Rolling Avg. First Response Time
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-4 pr-4 ">
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px] py-[10px] text-[#163143]">
                    {" "}
                    Download
                  </button>
                  <button className="flex items-center  rounded-full bg-[#F8F9FA] px-[15px]  py-[10px] text-[#163143]">
                    {" "}
                    Sort <ChevronDownIcon className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="max-h-[400px]  w-full overflow-y-auto ">
                <HorizontalBarTest />
              </div>
            </div>
          </div>
          {/* Avg. Roling Closed Tickets by Agent  */}
          <div className=" mt-10  min-h-[480px] rounded-2xl border text-[#163143]   ">
            <div className="flex items-center px-4 py-4 ">
              <h3 className=" text-base font-extrabold">
                Avg. Roling Closed Tickets by Agent
              </h3>
              <div className="ml-auto flex items-center gap-3">
                <ExpandIcon />
                <SettingIcon />
              </div>
            </div>
            <div className=" h-[2px] w-full bg-[#EFEFEF]" />

            <div className=" overflow-x-auto  ">
              <VerticalBartChartTest />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GlobalPerformance;
