export type EffectType =
  | 'compressor'
  | 'algorithmReverb'
  | 'convolutionReverb'
  | 'delay'
  | 'distortion'
  | 'filter'
  | 'lowpassCombFilter'
  | 'graphicEQ'
  | 'tremolo';

interface CommonEffectorNode {
  id: string;
  inputNode: GainNode;
  outputNode: GainNode;
  options: unknown;
  type: EffectType;
}

export interface CompressorEffectorNode extends CommonEffectorNode {
  type: 'compressor';
  options: {
    threshold: number;
    knee: number;
    attack: number;
    release: number;
    ratio: number;
  };
}

export interface AlgorithmReverbEffectorNode extends CommonEffectorNode {
  type: 'algorithmReverb';
  options: {
    mix: number;
    roomSize: number;
    dampening: number;
  };
}

export interface ConvolutionReverbEffectNode extends CommonEffectorNode {
  type: 'convolutionReverb';
  options: {
    mix: number;
    time: number;
    decay: number;
  };
}

export interface DelayEffectNode extends CommonEffectorNode {
  type: 'delay';
  options: {
    mix: number;
    feedback: number;
    time: number;
  };
}

export interface DistortionEffectNode extends CommonEffectorNode {
  type: 'distortion';
  options: {
    distortion: number;
  };
}

export interface FilterEffectNode extends CommonEffectorNode {
  type: 'filter';
  options: {
    type: BiquadFilterType;
    frequency: number;
    q: number;
  };
}

export interface LowPassCombFilterEffectNode extends CommonEffectorNode {
  type: 'lowpassCombFilter';
  options: {
    type: 'lowpassComb';
    frequency: number;
    delay: number;
    resonance: number;
  };
}

export interface GraphicEQEffectNode extends CommonEffectorNode {
  type: 'graphicEQ';
  options: {
    frequencies: number[];
  };
}

export interface TremoloEffectNode extends CommonEffectorNode {
  type: 'tremolo';
  options: {
    speed: number;
    depth: number;
    mix: number;
  };
}

export type EffectNode =
  | CompressorEffectorNode
  | AlgorithmReverbEffectorNode
  | ConvolutionReverbEffectNode
  | DelayEffectNode
  | DistortionEffectNode
  | FilterEffectNode
  | LowPassCombFilterEffectNode
  | GraphicEQEffectNode;
