import * as types from 'src/actions/actionTypes';

const initialState = {
  audioContext: new AudioContext(),
  tracks: [],
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
      return [...state, action.payload.audioTrack];
    case types.REMOVE_TRACK:
      return state.filter(track => track.id !== action.payload.trackId);
    case types.UPDATE_TRACK_NAME:
      state
        .find(track => track.id === action.payload.trackId)
        .setName(action.payload.trackName);
      return [...state];
    case types.ADD_EFFECT:
      state
        .find(track => track.id === action.payload.trackId)
        .addEffect(action.payload.effector);
      return [...state];
    case types.CHANGE_EFFECT:
      state
        .find(track => track.id === action.payload.trackId)
        .changeEffect(action.payload.effectId, action.payload.newEffector);
      return [...state];
    case types.REMOVE_EFFECT:
      state
        .find(track => track.id === action.payload.trackId)
        .removeEffect(action.payload.effectId);
      return [...state];
    default: break;
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
    case types.UPDATE_TRACK_NAME:
    case types.REMOVE_TRACK:
    case types.ADD_EFFECT:
    case types.CHANGE_EFFECT:
    case types.REMOVE_EFFECT:
      return {
        ...state,
        tracks: trackReducer(state.tracks, action),
      };
    default:
      return state;
  }
};

export default rootReducer;