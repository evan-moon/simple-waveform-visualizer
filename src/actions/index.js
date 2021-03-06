import * as types from './actionTypes';

export const addAudioTrack = (audioTrack) => {
  return {
    type: types.ADD_AUDIO_TRACK,
    payload: { audioTrack },
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

export const addEffect = (trackId, effector) => {
  return {
    type: types.ADD_EFFECT,
    payload: { trackId, effector },
  };
};

export const changeEffect = (trackId, effectId, newEffector) => {
  return {
    type: types.CHANGE_EFFECT,
    payload: { trackId, effectId, newEffector },
  };
};

export const removeEffect = (trackId, effectId) => {
  return {
    type: types.REMOVE_EFFECT,
    payload: { trackId, effectId },
  };
};

export const playAllTracks = () => {
  return { type: types.PLAY_ALL_TRACKS };
};

export const stopAllTracks = () => {
  return { type: types.STOP_ALL_TRACKS };
};
