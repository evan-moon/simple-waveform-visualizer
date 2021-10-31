import { useEffects } from '../../hooks/useEffects';
import { Compressor } from '../../lib/effects/Compressor';

/** @jsxImportSource @emotion/react */
const Effectors = () => {
  const { registedEffects, addEffect } = useEffects();

  return (
    <div>
      <ul css={{ margin: 0, padding: 0 }}>
        {registedEffects.map((effect) => (
          <li>{effect.id}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          addEffect(new Compressor());
        }}
      >
        이펙터 추가
      </button>
    </div>
  );
};

export default Effectors;
