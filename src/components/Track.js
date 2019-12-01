import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { WaveForm } from 'lib/WaveForm';

const StyledTrack = styled.div`
  svg {
    stroke: #7f00ff;
    width: 100%;
    height: 20vh;
  }
  g {
    width: 100%;
    height: 20vh;
  }
`;

export default function Track ({ track }) {
  const svgRef = useRef();
  const pathRef = useRef();
  const waveForm = new WaveForm(track);

  useEffect(() => {
    waveForm.draw({ svgBox: svgRef.current, pathGroup: pathRef.current });
  }, [svgRef, pathRef]);

  return (
    <StyledTrack>
      <svg ref={svgRef} preserveAspectRatio="none">
        <g ref={pathRef}></g>
      </svg>
    </StyledTrack>
  );
}