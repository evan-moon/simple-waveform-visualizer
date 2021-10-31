/** @jsxImportSource @emotion/react */
import { useAudio } from '../../hooks/useAudio';
import { useEffects } from '../../hooks/useEffects';
import { Compressor } from '../../lib/effects/Compressor';
import { EffectNode } from '../../models/effects';
import CompressorController from './CompressorController';

const getEffector = (effect: EffectNode) => {
  switch (effect.type) {
    case 'compressor':
      return <CompressorController effect={effect} />;
    default:
      null;
  }
};

const EffectorControllers = () => {
  const [audio] = useAudio();
  const { registedEffects, addEffect } = useEffects();

  return (
    <div>
      <ul css={{ margin: 0, padding: 0 }}>
        {registedEffects.map((effect) => (
          <li key={effect.id}>{getEffector(effect)}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          addEffect(new Compressor(audio?.context));
        }}
      >
        이펙터 추가
      </button>
    </div>
  );
};

export default EffectorControllers;
