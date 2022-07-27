import clsx from 'clsx';
import type { FC } from 'react';

import type { PanelContents } from '.';
import { colorClasses } from '../const';

type PanelProps = {
  panel: PanelContents;
};

export const Panel: FC<PanelProps> = ({ panel }) => {
  const { character, color } = panel;

  return (
    <div
      className={clsx(
        'flex h-[120px] w-[120px] items-center justify-center border text-7xl font-bold text-white',
        colorClasses[color],
      )}
    >
      {character}
    </div>
  );
};
