import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { WaveForm } from 'lib/WaveForm';

const StyledTrack = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  svg {
    stroke: #ffffff;
    width: 100%;
    height: 100%;
    background-color: ${props => props.color};
  }
  g {
    width: 100%;
    height: 20vh;
  }
`;

export default function WaveFormViewer ({ track, color }) {
  const svgRef = useRef();
  const pathRef = useRef();
  useEffect(() => {
    const waveForm = new WaveForm(track);
    waveForm.draw({ svgBox: svgRef.current, pathGroup: pathRef.current });
  }, [svgRef, pathRef, track]);

  return (
    <StyledTrack color={color}>
      <svg ref={svgRef} preserveAspectRatio="none">
        <g ref={pathRef}></g>
      </svg>
    </StyledTrack>
  );
}