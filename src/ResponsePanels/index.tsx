import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { characters } from '../const';
import { ResponseModal } from './ResponseModal';
import { SelectPanels } from './SelectPanels';

type Props = {
  finishHandler: () => void;
};

export const ResponsePanels: FC<Props> = ({ finishHandler }) => {
  const [selected, setSelected] = useState('');
  const [viewPanels, setViewPanels] = useState<typeof characters[number][]>([]);

  useEffect(() => {
    const panels: typeof characters[number][] = [];
    while (panels.length < 9) {
      const newCharacter =
        characters[Math.floor(Math.random() * characters.length)];
      if (!panels.includes(newCharacter)) {
        panels.push(newCharacter);
      }
    }
    setViewPanels(panels);
  }, []);

  return (
    <div>
      <div className='mb-8 text-center text-7xl'>⏳</div>
      <SelectPanels panels={viewPanels} selectHandler={setSelected} />
      {selected && (
        <ResponseModal character={selected} closeHandler={finishHandler} />
      )}

      <button onClick={finishHandler}>finish</button>
    </div>
  );
};
