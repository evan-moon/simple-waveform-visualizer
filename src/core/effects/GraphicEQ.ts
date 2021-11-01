import { Effect } from './Effect';

interface EQFilter {
  frequency: number;
  node: BiquadFilterNode;
}
export class GraphicEQ extends Effect<{ gain: number }> {
  frequencies: number[];
  q: number;
  filters: EQFilter[];

  constructor(context: AudioContext) {
    super(context, 'graphicEQ', { gain: 1 }, { gain: 1 });

    this.frequencies = [
      25, 31, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600,
      2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000,
    ];
    this.q = 1;
    this.filters = [];
    this._generateFilter();
  }

  getFilters() {
    return this.filters;
  }

  setFrequencyGain(frequency: number, gain: number) {
    const filter = this.filters.find((filter) => filter.frequency === frequency);
    filter?.node.gain.setValueAtTime(gain, this.context.currentTime);
  }

  _generateFilter() {
    const frequencies = this.frequencies;

    this.filters = frequencies.map((frequency, index) => {
      const filterNode = this.context.createBiquadFilter();
      filterNode.gain.value = 0;
      filterNode.frequency.setValueAtTime(frequency, this.context.currentTime);
      filterNode.Q.setValueAtTime(this.q, this.context.currentTime);
      if (index === 0) {
        filterNode.type = 'lowshelf';
      } else if (index === frequencies.length - 1) {
        filterNode.type = 'highshelf';
      } else {
        filterNode.type = 'peaking';
      }
      return { frequency, node: filterNode };
    });

    this.filters.reduce(
      (prev, current) => {
        prev.node.connect(current.node);
        return current;
      },
      { node: this.inputNode }
    );

    this.filters[this.filters.length - 1].node.connect(this.outputNode);
  }
}
