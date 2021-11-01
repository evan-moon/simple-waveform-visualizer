import { atom } from 'recoil';
import { AudioObject } from '../models/audio';
import { Effector } from '../models/effects';

export const audioContextState = atom<AudioObject | null>({
  key: 'audioContext',
  default: null,
});

export const effectState = atom<Effector[]>({
  key: 'audioEffects',
  default: [],
  dangerouslyAllowMutability: true,
});
