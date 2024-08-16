"use client"
import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux';
import { ReportsData } from '@/utils/Types';

const Report = () => {
  const TopCards = [
    {
      Text: "Credits",
      counts: "678",
    },
    {
      Text: "Players",
      counts: "679",
    },
    {
      Text: "Bets",
      counts: "896",
    },
    {
      Text: "Recharge",
      counts: "785",
    },
    {
      Text: "Redeem",
      counts: "785",
    }
  ];
  const Isreport = useSelector((state: ReportsData) => state.globlestate.Agent)
  console.log(Isreport,"report id")
  return (
    Isreport?.username&&<div className='w-full pt-5 pb-8 flex justify-between items-center space-x-4'>
       <Card TopCards={TopCards}/>
    </div>
  )
}

export default Report
