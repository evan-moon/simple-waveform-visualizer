import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TrackController from 'components/TrackController';
import WaveFormViewer from 'components/WaveFormViewer';
import { AsideDefaultWidth, WaveFormColors } from 'src/constants';

const mapStateToProps = ({ tracks }) => {
  return { tracks };
};

const StyledTrackBars = styled.div`
  background-color: #111111;
  height: 100vh;
  ul {
    margin: 0;
    padding: 0;
  }
  .track-control {
    width: ${AsideDefaultWidth}px;
    background-color: #222222;
    padding: .5rem;
  }
  .waveform-control {}
`;

function TrackBars (props) {
  return (
    <StyledTrackBars>
      <ul>
        {props.tracks.map((track, index) => {
          return (
            <li key={track.id}>
              <Row noGutters={true}>
                <Col xs="auto" className="track-control">
                  <TrackController
                    trackId={track.id}
                    trackName={track.name}
                    effects={track.effects} />
                </Col>
                <Col className="waveform-control">
                  <WaveFormViewer track={track} color={WaveFormColors[index % WaveFormColors.length]} />
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
    </StyledTrackBars>
  );
}

export default connect(mapStateToProps)(TrackBars);
