import { FC, useMemo, useState } from 'react';

type Props = {
  character: string;
  closeHandler: () => void;
};

export const ResponseModal: FC<Props> = ({ character, closeHandler }) => {
  const [inputText, setInputText] = useState('');
  const isInitial = useMemo(() => Math.floor(Math.random() * 2) === 0, []);

  const judge = () => {
    if (!inputText) return;
    if (isInitial) {
      if (inputText.startsWith(character)) {
        setInputText('');
        closeHandler();
      }
    } else {
      if (inputText.endsWith(character)) {
        setInputText('');
        closeHandler();
      }
    }
  };

  return (
    <div className='fixed top-1/2 left-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white'>
      <div>
        <div className='mb-2 text-center text-xl'>
          {isInitial
            ? `最初の文字が「${character}」の言葉`
            : `最後の文字が「${character}」の言葉`}
        </div>
        <div>
          <input
            className='w-full rounded-lg border border-gray-300 p-2 text-xl'
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                judge();
              }
            }}
          />
          <p className='text-right text-sm'>※ひらがなで入力</p>
          <button
            className='my-2 w-full rounded-full border-2 border-gray-500 py-2 text-center text-xl font-bold shadow-md'
            onClick={judge}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};
