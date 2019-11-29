import styles from './Toolbar.module.css';
import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
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

function Toolbar (props) {
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

  return (
    <aside className={styles.toolbar}>
      <Button onClick={onClickUploadButton}>Add Audio</Button>
      <input ref={fileUploaderRef} onChange={onChangeFileUploader} type="file" style={{ display: 'none' }} />
    </aside>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);