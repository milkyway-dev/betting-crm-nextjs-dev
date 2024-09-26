import React, { useState } from 'react';
import Down from '../svg/Down';

const Activity = ({ activities }: any) => {
  const [expanded, setExpanded] = useState({ bets: false, transactions: true });

  const toggleExpansion = (type: 'bets' | 'transactions') => {
    setExpanded((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };
  return (
    <div className='space-y-4'>
      {/* Bets */}
      <div className='space-y-2'>
        <div
          className={`bg-gray-700 dark:bg-gray-300 hover:dark:bg-gray-400 flex items-center text-white justify-between cursor-pointer hover:bg-gray-800 transition-all w-full py-2.5 rounded-sm px-3`}
          onClick={() => toggleExpansion('bets')}
        >
          <div className='text-white dark:text-gray-700'>Bets</div>
          <div className={`transform ${expanded.bets ? 'rotate-180' : ''}`}><Down /></div>
        </div>
        <div className={`bg-gray-700 dark:text-gray-700 dark:bg-gray-300 rounded-sm  w-full text-white text-sm accordion-content transition-max-height duration-200 ease-in-out overflow-hidden  ${expanded.bets ? 'max-h-screen py-2.5 px-3' : 'max-h-0 '}`}>
          Bets Data Come Here<br />
        </div>
      </div>
      {/* Transactions */}
      <div className='space-y-2'>
        <div
          className={`bg-gray-700 flex items-center dark:bg-gray-300 hover:dark:bg-gray-400 text-white justify-between cursor-pointer hover:bg-gray-800 transition-all w-full py-2.5 rounded-sm px-3`}
          onClick={() => toggleExpansion('transactions')}
        >
          <div className='text-white dark:text-gray-700'>Transactions</div>
          <div className={`transform ${expanded.transactions ? 'rotate-180' : ''}`}><Down /></div>
        </div>
        <div className={`bg-gray-700 dark:bg-gray-300 dark:text-gray-700 rounded-sm  w-full text-white text-xs md:text-sm accordion-content transition-max-height duration-200 ease-in-out overflow-hidden  ${expanded.transactions ? 'max-h-screen py-2.5 px-3' : 'max-h-0 '}`}>
          <table className='w-full'>
            <thead>
              <tr className='font-extralight'>
                <th className='py-1'>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Reciver</th>
                <th>Sender</th>
              </tr>
            </thead>
            <tbody>
              {
                activities?.transactions?.length > 0 && activities?.transactions?.map((item: any, ind:number) => (
                  <tr key={ind} className='bg-gray-800 dark:bg-gray-200 text-center'>
                    <td className='py-2'>{item?.type === 'redeem' ? <span className='bg-red-500  w-[100px] inline-block bg-opacity-25 text-red-500 px-4 py-1.5 rounded-md'>Redeem</span> : <span className='bg-green-500 w-[100px] inline-block bg-opacity-25 text-green-500 px-4 py-1.5 rounded-md'>Recharge</span>}</td>
                    <td>{item?.amount}</td>
                    <td>{new Date(item?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>{item?.receiver}</td>
                    <td>{item?.sender}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activity;