import { useRecoilState } from 'recoil';
import { audioContextState } from '../atoms/audio';

export function useAudio() {
  return useRecoilState(audioContextState);
}
