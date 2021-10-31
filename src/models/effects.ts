export enum EffectType {
  Compressor,
  AlgorithmReverb,
  ConvolutionReverb,
  Delay,
  Distortion,
  Filter,
  LowPassCombFilter,
  GraphicEQ,
  Tremolo,
}

interface CommonEffectorNode {
  inputNode: GainNode;
  outputNode: GainNode;
  options: unknown;
  type: EffectType;
}

export interface CompressorEffectorNode extends CommonEffectorNode {
  type: EffectType.Compressor;
  options: {
    threshold: number;
    knee: number;
    attack: number;
    release: number;
    ratio: number;
  };
}

export interface AlgorithmReverbEffectorNode extends CommonEffectorNode {
  type: EffectType.AlgorithmReverb;
  options: {
    mix: number;
    roomSize: number;
    dampening: number;
  };
}

export interface ConvolutionReverbEffectNode extends CommonEffectorNode {
  type: EffectType.ConvolutionReverb;
  options: {
    mix: number;
    time: number;
    decay: number;
  };
}

export interface DelayEffectNode extends CommonEffectorNode {
  type: EffectType.Delay;
  options: {
    mix: number;
    feedback: number;
    time: number;
  };
}

export interface DistortionEffectNode extends CommonEffectorNode {
  type: EffectType.Distortion;
  options: {
    distortion: number;
  };
}

export interface FilterEffectNode extends CommonEffectorNode {
  type: EffectType.Filter;
  options: {
    type: BiquadFilterType;
    frequency: number;
    q: number;
  };
}

export interface LowPassCombFilterEffectNode extends CommonEffectorNode {
  type: EffectType.LowPassCombFilter;
  options: {
    type: 'lowpassComb';
    frequency: number;
    delay: number;
    resonance: number;
  };
}

export interface GraphicEQEffectNode extends CommonEffectorNode {
  type: EffectType.GraphicEQ;
  options: {
    frequencies: number[];
  };
}

export interface TremoloEffectNode extends CommonEffectorNode {
  type: EffectType.Tremolo;
  options: {
    speed: number;
    depth: number;
    mix: number;
  };
}
