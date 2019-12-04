import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateTrackName } from 'src/actions';

const StyledTrackController = styled.div`
`;

const mapDispatchToProps = {
  updateTrackName
};

function TrackController (props) {
  function onChangeTrackName (e) {
    console.log(e.target.value);
    props.updateTrackName(props.trackId, e.target.value);
  }

  return (
    <StyledTrackController data-track-id={props.trackId}>
      <input type="text" value={props.trackName} onChange={onChangeTrackName} />
    </StyledTrackController>
  );
}

export default connect(null, mapDispatchToProps)(TrackController);