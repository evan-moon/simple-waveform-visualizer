import * as types from 'src/actions/actionTypes';

const initialState = {
  audioContext: new AudioContext(),
  tracks: [],
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
      return [...state, action.payload.audioTrack];
    case types.REMOVE_ALL_TRACKS:
      return [];
    case types.REMOVE_TRACK:
      return state.filter(track => track.id !== action.payload.trackId);
    case types.UPDATE_TRACK_NAME:
      const targetTrack = state.find(track => track.id === action.payload.trackId);
      targetTrack.setName(action.payload.trackName);
      return [...state];
    default: break;
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
    case types.UPDATE_TRACK_NAME:
    case types.REMOVE_ALL_TRACKS:
    case types.REMOVE_TRACK:
      return {
        ...state,
        tracks: trackReducer(state.tracks, action),
      };
    default:
      return state;
  }
};

export default rootReducer;