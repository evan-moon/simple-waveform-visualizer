import { Delay } from '../../core/effects/Delay';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: Delay;
}
const DelayController = ({ effect }: Props) => {
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
        label="Delay Time"
        min={0}
        max={1}
        defaultValue={0.3}
        onChange={(value) => effect.setTime(value)}
      />
      <ControlRange
        label="Feedback"
        min={0}
        max={1}
        defaultValue={0.5}
        onChange={(value) => effect.setFeedback(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default DelayController;
