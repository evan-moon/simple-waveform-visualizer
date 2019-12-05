import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { playAllTracks, stopAllTracks } from 'src/actions';
import { ButtonGroup, Button } from 'react-bootstrap';

const mapDispatchToProps = {
  playAllTracks,
  stopAllTracks,
};

const StyledHeader = styled.header`
  width: 100%;
  background-color: #333333;
  padding: .5rem;
  input[type="file"] {
    display: none;
  }
`;

function Header (props) {
  function onClickPlayButton () {
    props.playAllTracks();
  }

  function onClickStopButton () {
    props.stopAllTracks();
  }

  return (
    <StyledHeader>
      <ButtonGroup>
        <Button onClick={onClickPlayButton} variant="success">
          <i className="fas fa-play"></i>
        </Button>
        <Button onClick={onClickStopButton} variant="secondary">
          <i className="fas fa-stop"></i>
        </Button>
      </ButtonGroup>
    </StyledHeader>
  );
}

export default connect(null, mapDispatchToProps)(Header);