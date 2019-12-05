import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { playAllTracks, stopAllTracks } from 'src/actions';
import { Button } from 'react-bootstrap';

const mapDispatchToProps = {
  playAllTracks,
  stopAllTracks,
};

const StyledHeader = styled.header`
  width: 100%;
  height: 50px;
  background-color: #333333;
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
      <Button onClick={onClickPlayButton}>
        <i className="fas fa-play"></i>
      </Button>
      <Button onClick={onClickStopButton}>
        <i className="fas fa-stop"></i>
      </Button>
    </StyledHeader>
  );
}

export default connect(null, mapDispatchToProps)(Header);