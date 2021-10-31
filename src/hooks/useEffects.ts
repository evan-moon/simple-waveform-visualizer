import { useRecoilState } from 'recoil';
import { effectState } from '../atoms/audio';
import { Effect } from '../lib/effects/Effect';
import { useAudio } from './useAudio';

export function useEffects() {
  const [audio] = useAudio();
  const [registedEffects, registEffects] = useRecoilState(effectState);

  const addEffect = (effect: Effect) => {
    if (audio == null) {
      throw new Error('아직 AudioContext가 등록되지 않았습니다');
    }

    const lastNode =
      registedEffects.length > 0
        ? registedEffects[registedEffects.length - 1].outputNode
        : audio.bufferSourceNode;

    lastNode.disconnect();
    lastNode.connect(effect.inputNode);
    effect.outputNode.connect(audio.masterGain);

    registEffects([...registedEffects, effect]);
  };

  const removeEffect = (effectId: string) => {
    if (audio == null) {
      throw new Error('아직 AudioContext가 등록되지 않았습니다');
    }

    const targetEffectIndex = registedEffects.findIndex((effect) => effect.id === effectId);
    if (targetEffectIndex === -1) {
      throw new Error('이펙트를 찾을 수 없습니다');
    }

    const prevNode =
      targetEffectIndex === 0
        ? audio.bufferSourceNode
        : registedEffects[targetEffectIndex - 1].outputNode;
    const targetNode =
      registedEffects[targetEffectIndex + 1] != null
        ? registedEffects[targetEffectIndex + 1].inputNode
        : audio.masterGain;

    prevNode.disconnect();
    prevNode.connect(targetNode);

    registEffects((effects) => effects.filter((effect) => effect.id !== effectId));
  };

  const changeEffect = (effectId: string, newEffect: Effect) => {
    if (audio == null) {
      throw new Error('아직 AudioContext가 등록되지 않았습니다');
    }

    const originEffectorIndex = registedEffects.findIndex((e) => e.id === effectId);
    const originEffector = registedEffects[originEffectorIndex];

    const prevNode =
      originEffectorIndex === 0
        ? audio.bufferSourceNode
        : registedEffects[originEffectorIndex - 1].outputNode;
    const targetNode = registedEffects[originEffectorIndex + 1]
      ? registedEffects[originEffectorIndex + 1].inputNode
      : audio.masterGain;

    prevNode.disconnect();
    originEffector.outputNode.disconnect();

    prevNode.connect(newEffect.inputNode);
    newEffect.outputNode.connect(targetNode);

    registEffects((effects) =>
      effects.map((effect, index) => (index === originEffectorIndex ? newEffect : effect))
    );
  };

  return { addEffect, removeEffect, changeEffect, registedEffects };
}
