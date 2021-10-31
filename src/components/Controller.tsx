/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { audioContextState } from '../atoms/audio';
import ControlRange from './ControlRange';

const Controller = () => {
  const audio = useRecoilValue(audioContextState);
  const [isPlay, setPlay] = useState(false);

  const handlePlayButtonClick = () => {
    if (isPlay) {
      audio?.bufferSourceNode.stop();
      setPlay(false);
    } else {
      audio?.bufferSourceNode.start();
      setPlay(true);
    }
  };

  return (
    <div>
      {audio != null ? (
        <button onClick={handlePlayButtonClick}>{isPlay ? '정지' : '재생'}</button>
      ) : null}
      <div>
        {audio?.masterGain != null ? (
          <>
            <label>마스터 Gain</label>
            <ControlRange target={audio?.masterGain.gain} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Controller;
