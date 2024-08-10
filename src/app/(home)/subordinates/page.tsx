"use client";
import Header from "@/component/common/Header";
import Table from "@/component/ui/Table";
import { RootState } from "@/utils/Types";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const tabs = ["Agents", "Players", "Add"];
  const tableData = {
    Thead: [
      "User Name",
      "Status",
      "Credits",
      "Total Bets",
      "Total Recharge",
      "Total Reddem",
      "Action"
    ],
    Tbody: [
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      },
      {
        userName: 'Cheyenne',
        Status: 'Active',
        Credits: '278',
        TotalBets: '78',
        TotalRecharge: '7865',
        TotalReddem: '675',
        Action:''
      }
    ]
  };
  const isNotification = useSelector(
    (state: RootState) => state.globlestate.showNotification
  );
  return (
    <>
      <div
        className={`col-span-12 lg:col-span-9 ${
          isNotification ? "xl:col-span-8" : "xl:col-span-10"
        } transition-all `}
      >
        <Header />
        <Table tabelData={tableData} tabs={tabs} />
      </div>
    </>
  );
};

export default Page;
