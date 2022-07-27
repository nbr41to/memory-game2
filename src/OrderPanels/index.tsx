import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  finishHandler: () => void;
};

export const OrderPanels: FC<Props> = ({ finishHandler }) => {
  const [current, setCurrent] = useState(1);
  const [viewPanels, setViewPanels] = useState<number[]>([]);

  useEffect(() => {
    const viewPanels: number[] = [];
    for (let i = 1; i < 10; i++) {
      viewPanels.push(i);
    }
    /* シャッフル */
    for (let i = viewPanels.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [viewPanels[i], viewPanels[j]] = [viewPanels[j], viewPanels[i]];
    }
    setViewPanels(viewPanels);
  }, [current]);

  useEffect(() => {
    if (current === 10) {
      finishHandler();
    }
  }, [current, finishHandler]);

  return (
    <div>
      <div className='mb-8 text-center text-7xl'>⏳</div>
      <div className='flex h-[360px] w-[360px] flex-wrap justify-end overflow-hidden'>
        {viewPanels.map((number) => (
          <button
            className={clsx(
              'flex h-[120px] w-[120px] cursor-pointer items-center justify-center border text-6xl',
              current > number && 'bg-gray-300',
            )}
            key={number}
            onClick={() => setCurrent(number + 1)}
            disabled={current !== number}
          >
            {number}
          </button>
        ))}
      </div>
      <button onClick={() => setCurrent(17)}>finish</button>
    </div>
  );
};
