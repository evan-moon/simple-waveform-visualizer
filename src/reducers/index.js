import * as types from 'src/actions/actionTypes';

const initialState = {
  audioContext: new AudioContext(),
  tracks: [],
};

// C사가 쓰는 리듀서 나누는 방법
const trackReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
      return [...state, action.payload.audioTrack];
    case types.UPDATE_TRACK_NAME:
      const targetTrack = state.find(track => track.id === action.payload.trackId);
      targetTrack.setName(action.payload.trackName);
      return [...state];
    default: break;
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REMOVE_AUDIO_TRACK:
      return {
        ...state,
        audio: null,
      };
    case types.ADD_AUDIO_TRACK:
    case types.UPDATE_TRACK_NAME:
      return {
        ...state,
        tracks: trackReducer(state.tracks, action),
      };
    default:
      return state;
  }
};

export default rootReducer;