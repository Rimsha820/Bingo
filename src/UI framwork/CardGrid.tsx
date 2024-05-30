import React from 'react';
import { observer } from 'mobx-react-lite';
import bingoStore from '../core/BingoStore';
import { RxCross1 } from 'react-icons/rx';

interface CardGridProps {
  grid: number[][];
}

const CardGrid: React.FC<CardGridProps> = observer(({ grid }) => {
  const currentNumber = bingoStore.currentNumber;

  return (
    <div className="grid grid-cols-5 gap-2">
      {grid.flat().map((number, index) => (
        <div
          key={index}
          className={`relative rounded-md flex justify-center items-center text-2xl font-semibold h-12 w-12 ${
            bingoStore.numbersCalled.includes(number) ? 'bg-white' : 'bg-white'
          }`}
        >
          {bingoStore.numbersCalled.includes(number) ? (
            <>
              {number === currentNumber ? (
                <>{number}</> 
              ) : (
                <>
                  <RxCross1 className="text-red-500 text-4xl fixed" />
                  {number}
                </>
              )}
            </>
          ) : (
            number 
          )}
        </div>
      ))}
    </div>
  );
});

export default CardGrid;
