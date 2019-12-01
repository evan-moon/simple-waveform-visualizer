import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Track from 'src/components/Track';

const mapStateToProps = ({ tracks }) => {
  return {
    tracks,
  };
};

const StyledViewer = styled.div`
  background-color: #111111;
  height: 100vh;
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
      <ul>
        {props.tracks.map((track, index) => {
          return (
            <li data-track-id={track.id} data-track-index={index} key={track.id}>
              <Track track={track} />
            </li>
          );
        })}
      </ul>
    </StyledViewer>
  )
}

export default connect(mapStateToProps)(Viewer);