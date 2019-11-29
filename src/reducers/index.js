import * as types from 'src/actions/actionTypes';

const initialState = {
  audioContext: new AudioContext(),
  tracks: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_AUDIO_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload.audio],
      };
    case types.REMOVE_AUDIO_TRACK:
      return {
        ...state,
        audio: null,
      };
    default:
      return state;
  }
};

export default rootReducer;