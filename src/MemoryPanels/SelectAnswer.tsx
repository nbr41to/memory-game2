import clsx from 'clsx';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { animals, colorClasses, colors } from '../const';

type Props = {
  answer:
    | {
        correct: typeof animals[number];
        type: 'character';
      }
    | {
        correct: typeof colors[number];
        type: 'color';
      };
  finishHandler: () => void;
  scoreHandler: (isCorrect: boolean) => void;
};

export const SelectAnswer: FC<Props> = ({
  answer,
  finishHandler,
  scoreHandler,
}) => {
  const { correct, type } = answer;
  const [result, setResult] = useState<'correct' | 'incorrect'>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const answers = useMemo(() => {
    const answers = [correct];

    if (type === 'character') {
      while (answers.length < 4) {
        const random = Math.floor(Math.random() * animals.length);
        const incorrect = animals[random];
        if (!answers.includes(incorrect)) {
          answers.push(incorrect);
        }
      }
    }
    if (type === 'color') {
      while (answers.length < 4) {
        const random = Math.floor(Math.random() * colors.length);
        const incorrect = colors[random];
        if (!answers.includes(incorrect)) {
          answers.push(incorrect);
        }
      }
    }
    /* シャッフル */
    for (let i = answers.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  }, [type, answer]);

  const judge = (answer: typeof colors[number] | typeof animals[number]) => {
    const isCorrect = answer === correct;
    scoreHandler(isCorrect);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setIsAnswered(true);
  };

  const nextHandler = () => {
    setIsAnswered(false);
    setResult(undefined);
    finishHandler();
  };

  return (
    <div className='mt-6'>
      <div className='flex justify-between'>
        {answers.map((answer, index) => (
          <button
            key={index}
            className={clsx(
              'h-[60px] w-[86px] rounded-md border text-4xl shadow',
              // @ts-expect-error
              type === 'color' && colorClasses[answer],
              !isAnswered && 'cursor-pointer',
              isAnswered && answer === correct
                ? 'animate-bounce border-4 border-rose-400'
                : '',
            )}
            onClick={() => judge(answer)}
            disabled={isAnswered}
          >
            {type === 'character' && answer}
          </button>
        ))}
      </div>
      {isAnswered && result && (
        <div>
          <div
            className={clsx(
              'my-2 border py-2 text-center text-xl font-bold text-white',
              result === 'correct' ? 'bg-rose-400' : 'bg-indigo-500',
            )}
          >
            {result === 'correct' ? 'Good 🎉' : 'Bad 💀'}
          </div>
          <button
            className='my-2 w-full rounded-full border-2 border-gray-500 py-2 text-center text-xl font-bold shadow-md'
            onClick={nextHandler}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};
