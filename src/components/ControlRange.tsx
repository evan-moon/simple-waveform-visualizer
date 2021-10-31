/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

interface Props {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  onChange?: (value: number) => void;
}
const ControlRange = ({ label, min, max, defaultValue, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <div css={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        css={{
          WebkitAppearance: 'slider-vertical',
        }}
        step={min + max / 1000}
      />
      <span>{value}</span>
    </div>
  );
};

export default ControlRange;
