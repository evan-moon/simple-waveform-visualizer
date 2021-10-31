import { Compressor } from '../../core/effects/Compressor';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: Compressor;
}
const CompressorController = ({ effect }: Props) => {
  const { removeEffect } = useEffects();

  const remove = () => {
    removeEffect(effect.id);
  };

  return (
    <div>
      <ControlRange
        label="Gain"
        min={0}
        max={10}
        defaultValue={3}
        onChange={(value) => effect.setGain(value)}
      />
      <ControlRange
        label="Threshold"
        min={-100}
        max={0}
        defaultValue={-50}
        onChange={(value) => effect.setThreshold(value)}
      />
      <ControlRange
        label="Knee"
        min={0}
        max={40}
        defaultValue={30}
        onChange={(value) => effect.setKnee(value)}
      />
      <ControlRange
        label="Attack"
        min={0}
        max={1}
        defaultValue={3}
        onChange={(value) => effect.setAttack(value)}
      />
      <ControlRange
        label="Release"
        min={0}
        max={1}
        defaultValue={0.5}
        onChange={(value) => effect.setRelease(value)}
      />
      <ControlRange
        label="Ratio"
        min={1}
        max={20}
        defaultValue={12}
        onChange={(value) => effect.setRatio(value)}
      />
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default CompressorController;
