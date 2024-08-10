'use client'
import Header from "@/component/common/Header";
import { RootState } from "@/utils/Types";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const isNotification = useSelector(
    (state: RootState) => state.globlestate.showNotification
  );
  return (
    <div
      className={`col-span-12 ${
        isNotification ? "xl:col-span-8" : "xl:col-span-10"
      } lg:col-span-9 `}
    >
      <Header />
      Transaction Page
    </div>
  );
};

export default page;
