/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { audioContextState } from '../atoms/audio';
import { getWaveformSVGPath } from '../utils/waveform';

interface Props {
  color?: string;
}
const WaveForm = ({ color = '#000000' }: Props) => {
  const [audio] = useRecoilState(audioContextState);
  const svgRef = useRef<SVGSVGElement>(null);
  const [waveformPath, setWaveformPath] = useState('');

  useEffect(() => {
    if (audio != null && svgRef != null) {
      const path = getWaveformSVGPath(audio);
      setWaveformPath(path);
    }
  }, [audio, svgRef]);

  return (
    <svg
      ref={svgRef}
      css={{ width: '100%', height: 300 }}
      viewBox={`0 -1 ${audio?.buffer.sampleRate} 2`}
      preserveAspectRatio="none"
    >
      <g css={{ width: '100%', height: '100%' }}>
        <path d={waveformPath} css={{ stroke: color }} />
      </g>
    </svg>
  );
};

export default WaveForm;
