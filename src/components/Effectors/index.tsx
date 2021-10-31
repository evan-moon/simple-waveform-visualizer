import { useAudio } from '../../hooks/useAudio';
import { useEffects } from '../../hooks/useEffects';
import { Compressor } from '../../lib/effects/Compressor';

/** @jsxImportSource @emotion/react */
const Effectors = () => {
  const [audio] = useAudio();
  const { registedEffects, addEffect } = useEffects();

  return (
    <div>
      <ul css={{ margin: 0, padding: 0 }}>
        {registedEffects.map((effect) => (
          <li key={effect.id}>{effect.id}</li>
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

export default Effectors;
