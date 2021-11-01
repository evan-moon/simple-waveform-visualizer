import { ConvolutionReverb } from '../../core/effects/ConvolutionReverb';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: ConvolutionReverb;
}
const ConvolutionReverbController = ({ effect }: Props) => {
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
        label="Reverb Time"
        min={0.01}
        max={2}
        defaultValue={0.01}
        onChange={(value) => effect.setTime(value)}
      />
      <ControlRange
        label="Decay"
        min={0.01}
        max={2}
        defaultValue={0.01}
        onChange={(value) => effect.setDecay(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default ConvolutionReverbController;
