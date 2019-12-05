import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TrackController from 'components/TrackController';

const mapStateToProps = ({ tracks }) => {
  return {
    tracks,
  };
};

const StyledAside = styled.aside`
  width: 300px;
  height: 100vh;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #333333;
  > ul {
    margin: 0;
    padding: 0;
    > li {
      height: 20vh;
    }
  }
  
`;

function Toolbar (props) {
  return (
    <StyledAside>
      <ul>
        {props.tracks.map(track => {
          return (
            <li key={track.id}>
              <TrackController
                trackId={track.id}
                trackName={track.name}
                effects={track.effects} />
            </li>
          );
        })}
      </ul>
    </StyledAside>
  );
}

export default connect(mapStateToProps)(Toolbar);