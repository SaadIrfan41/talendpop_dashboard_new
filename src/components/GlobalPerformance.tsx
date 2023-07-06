"use client";
import { useMenuStore } from "@/store/useMenuStore";
import React from "react";

const GlobalPerformance = () => {
  const { reportingMenu } = useMenuStore();

  return (
    <div>
      {reportingMenu === 2 && (
        <div className="rounded-b-2xl rounded-tr-2xl border bg-white px-7  pb-20 pt-11">
          GlobalPerformance
        </div>
      )}
    </div>
  );
};

export default GlobalPerformance;
