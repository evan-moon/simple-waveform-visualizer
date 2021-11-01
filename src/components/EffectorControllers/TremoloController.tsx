import { Tremolo } from '../../core/effects/Tremolo';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: Tremolo;
}
const TremoloController = ({ effect }: Props) => {
  const { removeEffect } = useEffects();

  const remove = () => {
    removeEffect(effect.id);
  };

  return (
    <div>
      <ControlRange
        label="Gain"
        min={0}
        max={1}
        defaultValue={0.3}
        onChange={(value) => effect.setGain(value)}
      />
      <ControlRange
        label="Mix"
        min={0}
        max={1}
        defaultValue={0.5}
        onChange={(value) => effect.setMix(value)}
      />
      <ControlRange
        label="Speed"
        min={0}
        max={20}
        defaultValue={4}
        onChange={(value) => effect.setSpeed(value)}
      />
      <ControlRange
        label="Depth"
        min={0}
        max={1}
        defaultValue={1}
        onChange={(value) => effect.setDepth(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default TremoloController;
