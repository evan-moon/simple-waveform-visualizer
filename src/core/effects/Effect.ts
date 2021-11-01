import { EffectType } from '../../models/effects';

interface EffectorOption {
  gain: number;
  name?: string;
}
export class Effect<T extends EffectorOption> {
  id: string;
  type: EffectType;
  name?: string;
  context: AudioContext;
  options: T;
  inputNode: GainNode;
  outputNode: GainNode;

  constructor(context: AudioContext, type: EffectType, defaultOption: T, options?: T) {
    this.id = `${type}-${Date.now()}`;
    this.type = type;
    this.context = context;
    this.options = { ...defaultOption, ...options };
    this.inputNode = this.context.createGain();
    this.outputNode = this.context.createGain();
  }

  setGain(value: number) {
    this.options.gain = value;
    this.outputNode.gain.setValueAtTime(value, this.context.currentTime);
  }
}
