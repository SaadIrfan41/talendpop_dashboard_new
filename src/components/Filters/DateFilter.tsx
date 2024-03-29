"use client";
import { useFiltersStore } from "@/store/useFiltersStore";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { DatePickerForm } from "../Forms/DateFilterForm";
import useClickOutside from "@/utils/useClickOutside";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// import { Skeleton } from "../ui/skeleton";

const DateFilter = () => {
  const [showModal, setshowModal] = useState(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const [animateRef] = useAutoAnimate();

  useClickOutside(clickOutsideRef, () => {
    setshowModal(false);
  });
  return (
    <div ref={animateRef} style={{ zIndex: 10 }}>
      <button
        disabled={showModal}
        onClick={() => setshowModal(!showModal)}
        className=" relative flex items-center rounded-full border p-1  pl-3 text-sm font-bold text-[#163143]"
      >
        Date
        <div ref={animateRef}>
          {showModal ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>
      {showModal && (
        <div
          ref={clickOutsideRef}
          className=" absolute mx-auto mt-3 min-w-[300px] max-w-xl  rounded-3xl  bg-white shadow-2xl"
        >
          <div className="  flex flex-col items-center py-5 ">
            <DatePickerForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
