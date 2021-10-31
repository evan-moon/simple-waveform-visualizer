import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

interface Props {
  target: AudioParam;
  defaultValue?: number;
  onChange?: (value: number) => void;
}
const ControlRange = ({ target, defaultValue = 500 }: Props) => {
  const [audio] = useAudio();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    console.log(value / 100);
    target.setValueAtTime(value / 100, audio?.context.currentTime ?? 0);
  }, [value]);
  console.log(value);

  return (
    <input
      type="range"
      min={0}
      max={1000}
      value={value}
      onChange={(e) => {
        setValue(Number(e.target.value));
      }}
    />
  );
};

export default ControlRange;
