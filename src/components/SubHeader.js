import React, { useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addAudioTrack } from 'src/actions';
import { AudioTrack } from 'lib/Tracks/AudioTrack';
import { AsideDefaultWidth, TimelineDefaultWidth } from 'src/constants';

const mapStateToProps = ({ tracks, audioContext }) => {
  return {
    tracks,
    audioContext,
  };
};

const mapDispatchToProps = {
  addAudioTrack,
};

const Styled = styled.div`
  background-color: #000000;
  .track-control {
    padding: .5rem;
    background-color: #555555;
  }
`;

function SubHeader (props) {
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
      const audio = new AudioTrack(props.audioContext);
      audio.setAudio(onloadEvent.target.result).then(() => {
        props.addAudioTrack(audio);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <Styled>
      <Row noGutters={true}>
        <Col xs={AsideDefaultWidth} className="track-control">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClickUploadButton}>+</Button>
        </Col>
        <Col></Col>
        <input ref={fileUploaderRef} onChange={onChangeFileUploader} type="file" style={{ display: 'none' }} />
      </Row>
    </Styled>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);