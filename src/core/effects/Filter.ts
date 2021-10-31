import { Effect } from './Effect';

interface Options {
  frequency: number;
  q: number;
  gain: number;
}
class Filter extends Effect<Options> {
  filterNode: BiquadFilterNode;

  constructor(context: AudioContext, type: BiquadFilterType, options?: Options) {
    const defaultOption = {
      frequency: 350,
      q: 1,
      gain: 1,
    };

    super(context, 'filter', defaultOption, options);

    this.filterNode = context.createBiquadFilter();
    this.filterNode.type = type;
    this.filterNode.frequency.setValueAtTime(this.options.frequency, this.context.currentTime);
    this.filterNode.Q.setValueAtTime(this.options.q, this.context.currentTime);

    this.inputNode.connect(this.filterNode);
    this.filterNode.connect(this.outputNode);
  }

  setFrequency(value: number) {
    // LPF, HPF의 min, max 정해줘야 할듯? 현재는 1~22050
    this.filterNode.frequency.setValueAtTime(value, this.context.currentTime);
  }

  setQ(value: number) {
    this.filterNode.Q.setValueAtTime(value, this.context.currentTime);
  }
}

export class LowPassFilter extends Filter {
  constructor(context: AudioContext, options: Options) {
    super(context, 'lowpass', options);
  }
}

export class HighPassFilter extends Filter {
  constructor(context: AudioContext, options: Options) {
    super(context, 'highpass', options);
  }
}
