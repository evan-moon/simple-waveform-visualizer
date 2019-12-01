import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addAudioTrack } from 'src/actions';
import { Button } from 'react-bootstrap';
import { Audio } from 'lib/Audio';

const mapStateToProps = ({ audioContext }) => {
  return { audioContext };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addAudioTrack }, dispatch);
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
  const fileUploaderRef = useRef();

  function onClickUploadButton () {
    fileUploaderRef.current.click();
  }

  function onChangeFileUploader (e) {
    const file = e.currentTarget.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = onloadEvent => {
      const audio = new Audio(props.audioContext);
      audio.setAudio(onloadEvent.target.result).then(() => {
        props.addAudioTrack(audio);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  function onClickPlayButton () {
    console.log('play!');
  }

  function onClickStopButton () {
    console.log('stop!');
  }

  return (
    <StyledHeader>
      <Button onClick={onClickUploadButton}>+</Button>
      <Button onClick={onClickPlayButton}>
        <i className="fas fa-play"></i>
      </Button>
      <Button onClick={onClickStopButton}>
        <i className="fas fa-stop"></i>
      </Button>
      <input ref={fileUploaderRef} onChange={onChangeFileUploader} type="file" style={{ display: 'none' }} />
    </StyledHeader>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);