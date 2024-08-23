import React from 'react'
import Profile from '../svg/Profile'
import Card from './Card'
import ArrowUp from '../svg/ArrowUp';

const SubordinatesReport = ({ reportData }: any) => {
  const TopCards = [
    {
      Text: "Credits",
      counts: reportData?.credits,
      arrow: <ArrowUp />,
    },
    {
      Text: "Recharge",
      counts: "679",
      arrow: <ArrowUp />,
    },
    {
      Text: "Redeem",
      counts: "896",
      arrow: <ArrowUp />,
    }
  ];
  return (
    <div>
      <div className='flex items-center py-6 justify-between'>
        <div className='flex items-center space-x-2'>
          <Profile />
          <div>
            <div className='text-[.9rem] text-white md:text-xl capitalize tracking-wide'>{reportData?.username}</div>
            <div className='text-white text-[.7rem] text-opacity-40 pt-.5 tracking-wide'>{new Date(reportData?.createdAt).toLocaleDateString('en-Us', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>

        </div>
        <div>
          {reportData?.status === 'active' ? <span className="bg-green-700 bg-opacity-30 text-green-500 w-[80px] md:w-[100px] inline-block text-center py-1.5 md:py-2 rounded-xl">
            {reportData?.status}
          </span> :
            <span className="bg-red-700 text-center capitalize bg-opacity-30 text-red-500 w-[80px] md:w-[100px] inline-block py-1.5 md:py-2  rounded-xl">
              {reportData?.status}
            </span>}
        </div>
      </div>
      <div className='grid grid-cols-12 pb-8 pt-4 gap-5'>
        <Card TopCards={TopCards} />
      </div>
    </div>
  )
}

export default SubordinatesReport
