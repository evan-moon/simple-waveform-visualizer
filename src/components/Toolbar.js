import React, { useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TrackController from 'components/TrackController';
import { Button } from 'react-bootstrap';
import { addAudioTrack } from 'src/actions';
import { AudioTrack } from 'lib/Tracks/AudioTrack';

const mapStateToProps = ({ tracks, audioContext }) => {
  return {
    tracks,
    audioContext,
  };
};

const mapDispatchToProps = {
  addAudioTrack,
};

const StyledAside = styled.aside`
  width: 300px;
  height: 100vh;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #333333;
  div.toolbar-header {
    background-color: #444444;
    padding: 3px;
    
  }
  > ul {
    margin: 0;
    padding: 0;
    > li {
      height: 20vh;
    }
  }
  
`;

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
      const audio = new AudioTrack(props.audioContext);
      audio.setAudio(onloadEvent.target.result).then(() => {
        props.addAudioTrack(audio);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <StyledAside>
      <div className="toolbar-header">
        <Button
          variant="secondary"
          size="sm"
          onClick={onClickUploadButton}>+</Button>
      </div>
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
      <input ref={fileUploaderRef} onChange={onChangeFileUploader} type="file" style={{ display: 'none' }} />
    </StyledAside>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);