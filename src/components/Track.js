import React, { useEffect, useRef } from 'react';
import { WaveForm } from 'lib/WaveForm';

export default function Track ({ track }) {
  const svgRef = useRef();
  const pathRef = useRef();
  const waveForm = new WaveForm(track);

  useEffect(() => {
    waveForm.draw({ svgBox: svgRef.current, pathGroup: pathRef.current });
  }, [svgRef, pathRef]);

  return (
    <div>
      <svg ref={svgRef} preserveAspectRatio="none">
        <g ref={pathRef}></g>
      </svg>
    </div>
  );
}