import { HighPassFilter } from '../../core/effects/Filter';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: HighPassFilter;
}
const HighPassFilterController = ({ effect }: Props) => {
  const { removeEffect } = useEffects();

  const remove = () => {
    removeEffect(effect.id);
  };

  return (
    <div>
      <ControlRange
        label="Frequency"
        min={1}
        max={22050}
        defaultValue={350}
        onChange={(value) => effect.setFrequency(value)}
      />
      <ControlRange
        label="Q"
        min={0.0001}
        max={10}
        defaultValue={0.0001}
        onChange={(value) => effect.setQ(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default HighPassFilterController;
