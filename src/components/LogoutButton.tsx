"use client";
import React from "react";
import { deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    if (hasCookie("talentPOP_token")) {
      deleteCookie("talentPOP_token");
    }
    router.push("/login");
  };
  return (
    <div
      onClick={() => handleLogout()}
      className=" ml-auto cursor-pointer text-base font-normal hover:underline"
    >
      Sign out
    </div>
  );
};

export default LogoutButton;
