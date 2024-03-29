import { LowPassCombFilter } from './LowPassCombFilter';
import { Effect } from './Effect';

interface Options {
  mix: number;
  roomSize: number;
  dampening: number;
  gain: number;
}
export class AlgorithmReverb extends Effect<Options> {
  wetNode: GainNode;
  dryNode: GainNode;
  splitter: ChannelSplitterNode;
  merger: ChannelMergerNode;
  combFilters: LowPassCombFilter[];
  allFilters: BiquadFilterNode[];

  constructor(context: AudioContext, options?: Options) {
    const defaultOption = {
      mix: 0.5,
      roomSize: 3,
      dampening: 3,
      gain: 1,
    };
    super(context, 'algorithmReverb', defaultOption, options);
    const sampleRate = context.sampleRate;

    this.wetNode = this.context.createGain();
    this.dryNode = this.context.createGain();
    this.splitter = this.context.createChannelSplitter(2);
    this.merger = this.context.createChannelMerger(2);

    this.combFilters = [1557, 1617, 1491, 1422, 1277, 1356, 1188, 1116].map((delayPerSecond) => {
      return new LowPassCombFilter(this.context, {
        delay: delayPerSecond / sampleRate,
        frequency: this.options.dampening,
        resonance: 0.5,
        gain: 1,
      });
    });

    this.allFilters = [225, 556, 441, 341].map((frequency) => {
      const filter = this.context.createBiquadFilter();
      filter.type = 'allpass';
      filter.frequency.setValueAtTime(frequency, this.context.currentTime);
      return filter;
    });

    const combLeft = this.combFilters.slice(0, 1);
    const combRight = this.combFilters.slice(7);

    this.inputNode.connect(this.wetNode).connect(this.splitter);
    this.inputNode.connect(this.dryNode).connect(this.outputNode);

    combLeft.forEach((combFilter) => {
      this.splitter.connect(combFilter.inputNode, 0);
      combFilter.outputNode.connect(this.merger, 0, 0);
    });
    combRight.forEach((combFilter) => {
      this.splitter.connect(combFilter.inputNode, 1);
      combFilter.outputNode.connect(this.merger, 0, 1);
    });

    this.merger
      .connect(this.allFilters[0])
      .connect(this.allFilters[1])
      .connect(this.allFilters[2])
      .connect(this.allFilters[3])
      .connect(this.outputNode);
  }

  setMix(value: number) {
    // 0 ~ 1 (dry ~ wet)
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setRoomSize(value: number) {
    this.combFilters.forEach((combFilter) => combFilter.setResonance(value));
  }

  setDampening(value: number) {
    this.combFilters.forEach((combFilter) => combFilter.setFrequency(value));
  }
}
