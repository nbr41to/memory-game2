import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  panels: string[];
  selectHandler: (panel: string) => void;
};

export const SelectPanels: FC<Props> = ({ panels, selectHandler }) => {
  return (
    <div className='flex h-[360px] w-[360px] flex-wrap justify-end overflow-hidden'>
      {panels.map((character, index) => (
        <button
          className={clsx(
            'flex h-[120px] w-[120px] cursor-pointer items-center justify-center border text-6xl',
          )}
          key={index}
          onClick={() => selectHandler(character)}
        >
          {character}
        </button>
      ))}
    </div>
  );
};
