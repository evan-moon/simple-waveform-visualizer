import { ChangeEvent } from 'react';
import { EffectType } from '../models/effects';

const effectors: EffectType[] = [
  'compressor',
  'algorithmReverb',
  'convolutionReverb',
  'delay',
  'distortion',
  'lowpassFilter',
  'highpassFilter',
  'graphicEQ',
  'tremolo',
];

interface Props {
  onChange?: (effector: EffectType) => void;
}
const EffectorSelector = ({ onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as EffectType);
  };

  return (
    <select onChange={handleChange}>
      {effectors.map((effector) => (
        <option key={effector}>{effector}</option>
      ))}
    </select>
  );
};

export default EffectorSelector;
