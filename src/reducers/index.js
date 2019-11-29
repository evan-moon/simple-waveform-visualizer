import * as types from 'src/actions/actionTypes';
import { Audio } from 'lib/Audio';

const initialState = {
  audio: AudioContext ? new Audio(new AudioContext()) : null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUDIO:
      break;
    case types.DESTROY_AUDIO:
      break;
    default:
      break;
  }
};

export default rootReducer;