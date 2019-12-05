import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WaveFormViewer from 'src/components/WaveFormViewer';
import { WaveFormColors } from 'src/constants';
import { Button } from 'react-bootstrap';

const mapStateToProps = ({ tracks }) => {
  return {
    tracks,
  };
};

const StyledViewer = styled.div`
  background-color: #111111;
  height: 100vh;
  div.timeline-ruler {
    padding: .5rem;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }
`;

function Viewer (props) {
  return (
    <StyledViewer>
      <div className="timeline-ruler">
        <Button size="sm" variant="secondary">
          <i className="fas fa-ruler-combined"></i>
        </Button>
      </div>
      <ul>
        {props.tracks.map((track, index) => {
          return (
            <li data-track-id={track.id} data-track-index={index} key={track.id}>
              <WaveFormViewer track={track} color={WaveFormColors[index % WaveFormColors.length]} />
            </li>
          );
        })}
      </ul>
    </StyledViewer>
  )
}

export default connect(mapStateToProps)(Viewer);