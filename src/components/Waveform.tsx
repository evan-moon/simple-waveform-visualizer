import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { audioContextState } from '../atoms/audio';

const WaveForm = () => {
  const [context] = useRecoilState(audioContextState);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    console.log(context, svgRef);
    if (context != null && svgRef != null) {
      console.log('rendered wavedform');
    }
  }, [context, svgRef]);

  return <svg ref={svgRef}></svg>;
};

export default WaveForm;
