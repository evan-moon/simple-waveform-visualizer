import { AlgorithmReverb } from '../core/effects/AlgorithmReverb';
import { Compressor } from '../core/effects/Compressor';
import { ConvolutionReverb } from '../core/effects/ConvolutionReverb';
import { Delay } from '../core/effects/Delay';
import { Distortion } from '../core/effects/Distortion';
import { HighPassFilter, LowPassFilter } from '../core/effects/Filter';
import { GraphicEQ } from '../core/effects/GraphicEQ';
import { LowPassCombFilter } from '../core/effects/LowPassCombFilter';
import { Tremolo } from '../core/effects/Tremolo';

export type EffectType =
  | 'compressor'
  | 'algorithmReverb'
  | 'convolutionReverb'
  | 'delay'
  | 'distortion'
  | 'lowpassFilter'
  | 'highpassFilter'
  | 'lowpassCombFilter'
  | 'graphicEQ'
  | 'tremolo';

export type Effector =
  | Compressor
  | AlgorithmReverb
  | ConvolutionReverb
  | Delay
  | Distortion
  | LowPassFilter
  | HighPassFilter
  | LowPassCombFilter
  | GraphicEQ
  | Tremolo;
