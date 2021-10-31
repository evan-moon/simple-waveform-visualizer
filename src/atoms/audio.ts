import { atom } from 'recoil';
import { Effect } from '../lib/effects/Effect';
import { AudioObject } from '../models/audio';

export const audioContextState = atom<AudioObject | null>({
  key: 'audioContext',
  default: null,
});

export const effectState = atom<Effect[]>({
  key: 'audioEffects',
  default: [],
});
