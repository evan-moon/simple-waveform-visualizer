/** @jsxImportSource @emotion/react */
import { useAudio } from '../../hooks/useAudio';
import { useEffects } from '../../hooks/useEffects';
import { Compressor } from '../../core/effects/Compressor';
import CompressorController from './CompressorController';
import { Effector, EffectType } from '../../models/effects';
import { AlgorithmReverb } from '../../core/effects/AlgorithmReverb';
import AlgorithmReverbController from './AlgorithmReverbController';
import { ConvolutionReverb } from '../../core/effects/ConvolutionReverb';
import ConvolutionReverbController from './ConvolutionReverbController';
import DelayController from './DelayController';
import DistortionController from './DistortionController';
import { Delay } from '../../core/effects/Delay';
import { Distortion } from '../../core/effects/Distortion';
import { GraphicEQ } from '../../core/effects/GraphicEQ';
import GraphicEQController from './GraphicEQController';
import { HighPassFilter, LowPassFilter } from '../../core/effects/Filter';
import HighPassFilterController from './HighPassFilterController';
import LowPassFilterController from './LowPassFilterController';
import { Tremolo } from '../../core/effects/Tremolo';
import TremoloController from './TremoloController';
import EffectorSelector from '../EffectorSelector';
import { useState } from 'react';

const getEffector = (effect: Effector) => {
  if (effect instanceof Compressor) {
    return <CompressorController effect={effect} />;
  } else if (effect instanceof AlgorithmReverb) {
    return <AlgorithmReverbController effect={effect} />;
  } else if (effect instanceof ConvolutionReverb) {
    return <ConvolutionReverbController effect={effect} />;
  } else if (effect instanceof Delay) {
    return <DelayController effect={effect} />;
  } else if (effect instanceof Distortion) {
    return <DistortionController effect={effect} />;
  } else if (effect instanceof GraphicEQ) {
    return <GraphicEQController effect={effect} />;
  } else if (effect instanceof HighPassFilter) {
    return <HighPassFilterController effect={effect} />;
  } else if (effect instanceof LowPassFilter) {
    return <LowPassFilterController effect={effect} />;
  } else if (effect instanceof Tremolo) {
    return <TremoloController effect={effect} />;
  }

  return null;
};

const EffectorControllers = () => {
  const [audio] = useAudio();
  const { registedEffects, addEffect } = useEffects();
  const [selectedEffectType, selectEffectType] = useState<EffectType>('compressor');

  return (
    <div>
      <ul css={{ display: 'flex', margin: 0, padding: 0 }}>
        {registedEffects.map((effect) => (
          <li key={effect.id}>{getEffector(effect)}</li>
        ))}
      </ul>
      <div>
        <EffectorSelector onChange={selectEffectType} />
        <button
          onClick={() => {
            if (audio?.context == null || selectedEffectType == null) {
              return;
            }

            switch (selectedEffectType) {
              case 'compressor':
                addEffect(new Compressor(audio.context));
                break;
              case 'algorithmReverb':
                addEffect(new AlgorithmReverb(audio.context));
                break;
              case 'convolutionReverb':
                addEffect(new ConvolutionReverb(audio.context));
                break;
              case 'delay':
                addEffect(new Delay(audio.context));
                break;
              case 'distortion':
                addEffect(new Distortion(audio.context));
                break;
              case 'graphicEQ':
                addEffect(new GraphicEQ(audio.context));
                break;
              case 'highpassFilter':
                addEffect(new HighPassFilter(audio.context));
                break;
              case 'lowpassFilter':
                addEffect(new LowPassFilter(audio.context));
                break;
              case 'tremolo':
                addEffect(new Tremolo(audio.context));
                break;
            }
          }}
        >
          이펙터 추가
        </button>
      </div>
    </div>
  );
};

export default EffectorControllers;
