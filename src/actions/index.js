import * as types from './actionTypes';

export const addAudioTrack = (audio) => {
  return {
    type: types.ADD_AUDIO_TRACK,
    payload: { audio },
  };
};

export const removeAudioTrack = (audioId) => {
  return {
    type: types.REMOVE_AUDIO_TRACK,
    payload: { audioId },
  };
};
