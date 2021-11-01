import { Distortion } from '../../core/effects/Distortion';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: Distortion;
}
const DistortionController = ({ effect }: Props) => {
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
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default DistortionController;
