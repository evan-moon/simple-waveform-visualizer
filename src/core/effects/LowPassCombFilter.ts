import { Effect } from './Effect';

interface Options {
  frequency: number;
  delay: number;
  resonance: number;
  gain: number;
}
export class LowPassCombFilter extends Effect<Options> {
  filterNode: BiquadFilterNode;
  delayNode: DelayNode;
  gainNode: GainNode;

  constructor(context: AudioContext, options: Options) {
    const defaultOption = {
      frequency: 440,
      delay: 0.7,
      resonance: 0.5,
      gain: 1,
    };

    super(context, 'lowpassCombFilter', defaultOption, options);

    const { frequency, delay, resonance } = this.options;

    this.filterNode = this.context.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(frequency, this.context.currentTime);

    this.delayNode = this.context.createDelay(delay);
    this.gainNode = this.context.createGain();
    this.gainNode.gain.setValueAtTime(resonance, context.currentTime);

    this.inputNode
      .connect(this.delayNode)
      .connect(this.filterNode)
      .connect(this.gainNode)
      .connect(this.inputNode)
      .connect(this.outputNode);
  }

  setFrequency(value: number) {
    this.filterNode.frequency.setValueAtTime(value, this.context.currentTime);
  }

  setDelay(value: number) {
    this.delayNode.delayTime.setValueAtTime(value, this.context.currentTime);
  }

  setResonance(value: number) {
    this.options.resonance = value;
    this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
  }
}
