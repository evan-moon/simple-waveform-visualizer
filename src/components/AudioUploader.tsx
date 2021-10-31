/** @jsxImportSource @emotion/react */
import { ChangeEvent, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { audioContextState } from '../atoms/audio';
import { createAudio } from '../utils/audio';

const AudioUploader = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [, setAudioContext] = useRecoilState(audioContextState);

  const handleClick = () => {
    if (fileRef.current == null) {
      return;
    }

    fileRef.current.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file == null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        const context = new AudioContext();
        const audioObject = await createAudio(context, arrayBuffer);
        setAudioContext(audioObject);
      } else {
        setAudioContext(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <button
        onClick={handleClick}
        css={{
          width: 30,
          height: 30,
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity .2s ease-in-out',
          '&:hover': {
            opacity: 0.7,
          },
        }}
      >
        +
      </button>
      <input
        onChange={handleFileChange}
        ref={fileRef}
        type="file"
        css={{ position: 'fixed', display: 'none' }}
      />
    </>
  );
};

export default AudioUploader;
