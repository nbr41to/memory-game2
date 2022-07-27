import { FC, useEffect } from 'react';
import { useState } from 'react';

import { MemoryPanels } from './MemoryPanels';
import { OrderPanels } from './OrderPanels';
import { ResponsePanels } from './ResponsePanels';

type GamePageProps = {};

export const GamePage: FC<GamePageProps> = () => {
  const [gameState, setGameState] = useState({
    failedCount: 0,
    getPoints: 0,
    Answered: false,
    finishedTask: true,
    taskId: '1',
  });

  const answerFinishHandler = () => {
    setTimeout(() => {
      setGameState({
        ...gameState,
        Answered: true,
        finishedTask: false,
      });
    }, 1000);
  };

  const scoreHandler = (isCorrect: boolean) => {
    setGameState({
      ...gameState,
      getPoints: isCorrect ? gameState.getPoints + 1 : 0,
    });
  };

  const taskFinishHandler = () => {
    setGameState({
      ...gameState,
      Answered: false,
      finishedTask: true,
    });
  };

  // useEffect(() => {
  //   const taskId = Math.floor(Math.random() * 2);
  //   setGameState({
  //     ...gameState,
  //     taskId: taskId.toString(),
  //   });
  // }, [gameState.Answered]);

  return (
    <div>
      <h1 className='mt-6 text-center text-3xl font-bold'>◆ Memory Game 2 ◆</h1>
      <div className='mx-auto mt-2 w-[360px]'>
        <div className='text-xl font-bold'>score: {gameState.getPoints}</div>
        <MemoryPanels
          isAnswering={!gameState.Answered}
          finishHandler={answerFinishHandler}
          scoreHandler={scoreHandler}
        />
      </div>

      {!gameState.finishedTask && (
        <div className='fixed top-1/2 left-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white'>
          {gameState.taskId === '0' ? (
            <OrderPanels finishHandler={taskFinishHandler} />
          ) : (
            <ResponsePanels finishHandler={taskFinishHandler} />
          )}
        </div>
      )}
    </div>
  );
};
