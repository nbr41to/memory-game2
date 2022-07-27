import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { animals, colors } from '../const';
import { Panel } from './Panel';
import { SelectAnswer } from './SelectAnswer';

export type PanelContents = {
  character: typeof animals[number];
  color: typeof colors[number];
};

type Props = {
  isAnswering: boolean;
  finishHandler: () => void;
  scoreHandler: (isCorrect: boolean) => void;
};

const createRow = () => {
  const row: PanelContents[] = [];
  while (row.length < 3) {
    const newCharacter = animals[Math.floor(Math.random() * animals.length)];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    if (
      !row.map((r) => r.character).includes(newCharacter) &&
      !row.map((r) => r.color).includes(newColor)
    ) {
      row.push({ character: newCharacter, color: newColor });
    }
  }
  return row;
};

export const MemoryPanels: FC<Props> = ({
  isAnswering,
  finishHandler,
  scoreHandler,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [viewPanels, setViewPanels] = useState<PanelContents[][]>([]);
  const [isMoving, setIsMoving] = useState(false);

  const answerPlace = useMemo(() => {
    return Math.floor(Math.random() * 3);
  }, [viewPanels, isAnswering]);

  const questionState = useMemo(() => {
    if (viewPanels.length !== 4) return;
    const types = ['character', 'color'] as const;
    const type = types[Math.floor(Math.random() * 2)];
    if (type === 'character') {
      return {
        type,
        correct: viewPanels[3][answerPlace].character,
      };
    }

    return {
      type,
      correct: viewPanels[3][answerPlace].color,
    };
  }, [viewPanels, isAnswering]);

  useEffect(() => {
    const panels: PanelContents[][] = [];
    while (panels.length < 4) {
      panels.push(createRow());
    }
    setViewPanels(panels);
  }, []);

  const nextHandler = () => {
    setIsMoving(true);
    setTimeout(() => {
      const newPanels = [...viewPanels];
      newPanels.pop();
      newPanels.unshift(createRow());
      setViewPanels(newPanels);
      setIsStarted(true);
      setIsMoving(false);
    }, 1000);
    finishHandler();
  };

  return (
    <div className='relative'>
      <div className='flex h-[240px] w-[360px] flex-col justify-end overflow-hidden'>
        {viewPanels.map((row, i) => (
          <div className={clsx('flex', isMoving && 'panel-down')} key={i}>
            {row.map((panel, j) => (
              <Panel key={j} panel={panel} />
            ))}
          </div>
        ))}
      </div>
      <div className='absolute top-[120px] h-[120px] w-[360px] border bg-gray-800/50'>
        <div className='flex'>
          <div className='h-[120px] w-[120px] border' />
          <div className='h-[120px] w-[120px] border' />
          <div className='h-[120px] w-[120px] border' />
        </div>
        {/* <div className='flex'>
          <div className='h-[120px] w-[120px] border' />
          <div className='h-[120px] w-[120px] border' />
          <div className='h-[120px] w-[120px] border' />
        </div> */}
      </div>
      <div
        className={clsx(
          'absolute top-[120px] flex w-full',
          answerPlace === 0 && 'justify-start',
          answerPlace === 1 && 'justify-center',
          answerPlace === 2 && 'justify-end',
        )}
      >
        {isAnswering && isStarted && (
          <div className='m-[15px] flex h-[90px] w-[90px] items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white'>
            ここは？
          </div>
        )}
      </div>

      {isAnswering && questionState && isStarted && (
        <SelectAnswer
          answer={questionState}
          finishHandler={nextHandler}
          scoreHandler={scoreHandler}
        />
      )}
      {!isStarted && (
        <button
          className='my-2 w-full rounded-full border-2 border-gray-500 py-2 text-center text-xl font-bold shadow-md'
          onClick={nextHandler}
        >
          START
        </button>
      )}
    </div>
  );
};
