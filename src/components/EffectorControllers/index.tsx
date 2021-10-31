/** @jsxImportSource @emotion/react */
import { useAudio } from '../../hooks/useAudio';
import { useEffects } from '../../hooks/useEffects';
import { Compressor } from '../../core/effects/Compressor';
import CompressorController from './CompressorController';
import { Effector } from '../../models/effects';

const getEffector = (effect: Effector) => {
  if (effect instanceof Compressor) {
    return <CompressorController effect={effect} />;
  }
  return null;
};

const EffectorControllers = () => {
  const [audio] = useAudio();
  const { registedEffects, addEffect } = useEffects();

  return (
    <div>
      <ul css={{ display: 'flex', margin: 0, padding: 0 }}>
        {registedEffects.map((effect) => (
          <li key={effect.id}>{getEffector(effect)}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          if (audio?.context == null) {
            return;
          }

          addEffect(new Compressor(audio.context));
        }}
      >
        이펙터 추가
      </button>
    </div>
  );
};

export default EffectorControllers;
