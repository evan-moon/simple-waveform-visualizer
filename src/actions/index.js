import * as types from './actionTypes';

export const addAudioTrack = (audioTrack) => {
  return {
    type: types.ADD_AUDIO_TRACK,
    payload: { audioTrack },
  };
};

export const removeAllTracks = () => {
  return {
    type: types.REMOVE_ALL_TRACKS,
  };
};

export const removeTrack = (trackId) => {
  return {
    type: types.REMOVE_TRACK,
    payload: { trackId },
  };
};

export const updateTrackName = (trackId, trackName) => {
  return {
    type: types.UPDATE_TRACK_NAME,
    payload: { trackId, trackName },
  };
};
