import * as types from './actionTypes';

export const addAudioTrack = (audioTrack) => {
  return {
    type: types.ADD_AUDIO_TRACK,
    payload: { audioTrack },
  };
};

export const removeAudioTrack = (audioId) => {
  return {
    type: types.REMOVE_AUDIO_TRACK,
    payload: { audioId },
  };
};

export const updateTrackName = (trackId, trackName) => {
  return {
    type: types.UPDATE_TRACK_NAME,
    payload: { trackId, trackName },
  };
};
