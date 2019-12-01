import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateTrackName } from 'src/actions';

const StyledTrackController = styled.div`
`;

const mapDispatchToProps = {
  updateTrackName
};

function TrackController ({ track }) {
  function onChangeTrackName (e) {
    console.log(e.target.value);
    // updateTrackName(e.target.value);
  }

  return (
    <StyledTrackController data-track-id={track.id}>
      <input type="text" value={track.name} onChange={onChangeTrackName} />
    </StyledTrackController>
  );
}

export default connect(null, mapDispatchToProps)(TrackController);