import React from 'react';
import { connect } from 'react-redux';
import Track from 'src/components/Track';

const mapStateToProps = ({ tracks }) => {
  return {
    tracks,
  };
};

function Viewer (props) {
  return (
    <div>
      <ul>
        {props.tracks.map((track, index) => {
          return (
            <li data-track-id={track.id} data-track-index={index} key={track.id}>
              <Track track={track} />
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default connect(mapStateToProps)(Viewer);