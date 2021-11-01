import { AlgorithmReverb } from '../../core/effects/AlgorithmReverb';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: AlgorithmReverb;
}
const AlgorithmReverbController = ({ effect }: Props) => {
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
        label="Room Size"
        min={0}
        max={1}
        defaultValue={0.5}
        onChange={(value) => effect.setRoomSize(value)}
      />
      <ControlRange
        label="Dampening"
        min={0}
        max={22000}
        defaultValue={440}
        onChange={(value) => effect.setDampening(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default AlgorithmReverbController;
