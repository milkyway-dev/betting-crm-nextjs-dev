import { TopCardItem } from '@/utils/Types';
import React from 'react';

interface CardProps {
  TopCards: TopCardItem[];
}

const Card: React.FC<CardProps> = ({ TopCards }) => {
  return (
    <>
      {TopCards?.map((item, index) => (
        <div key={index} className="col-span-6 md:col-span-4 xl:col-span-3 bg-[#E3F5FF] p-3 md:p-5 rounded-2xl">
          <span className="text-dark_black capitalize text-base">{item.Text}</span>
          <div className="flex items-center justify-between pt-4">
            <div className="text-2xl md:text-4xl text-black">{item.counts}K</div>
            <div className="flex items-center space-x-2">
              <div className="text-sm md:text-base text-black text-opacity-80">
                {item.percentage}
              </div>
              {item.arrow}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;