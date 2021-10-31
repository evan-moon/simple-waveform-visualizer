import { atom } from 'recoil';
import { AudioObject } from '../models/audio';

export const audioContextState = atom<AudioObject | null>({
  key: 'audioContext',
  default: null,
});
