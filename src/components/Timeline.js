import React from 'react';
import styled from 'styled-components';

const StyledTimeline = styled.div`
  height: 100%;
  background-color: #444444;
`;
const StyledRuler = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  span.graduation {
    display: inline-block;
    width: 1px;
    background-color: #222222;
    margin-right: .5rem;
    margin-top: 23px;
    > span {
      font-size: .5rem;
      position: absolute;
      transform: translate(-50%, -100%);
      letter-spacing: -1px;
    }
    &[data-time="second"] {
      height: 20%;
    }
    &[data-time="minute"] {
      height: 30%;
    }
  }
`;

const defaultLength = 300; // minute

export const Ruler = ({ length }) => {
  return (
    <StyledRuler className="ruler">
      {Array(length).fill(0).map((el, index) => {
        return index % 60 === 0
          ? (
            <span className="graduation" data-time="minute" key={index}>
              {/*<span>{index}</span>*/}
            </span>)
          : (
            <span className="graduation" data-time="second" key={index}>
              {/*<span>{index}</span>*/}
            </span>
          );
      })}
    </StyledRuler>
  );
};

export default function Timeline ({ length }) {
  const rulerLength = length || defaultLength;
  return (
    <StyledTimeline>
      <Ruler length={rulerLength} />
    </StyledTimeline>
  );
}