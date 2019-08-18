export class GraphicEQ {
  constructor (context) {
    this.context = context;

    this.frequencies = [
      25, 31, 40, 50, 63, 80, 100, 125, 160, 200,
      250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000,
      2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000
    ];
    this.defaultQ = 1;
    this.filters = [];

    this.inputNode = this.context.createGain();
    this.outputNode = this.context.createGain();

    this._generateFilter();
  }

  getFilters () {
    return this.filters;
  }

  setFrequencyGain (frequency, gain) {
    const filter = this.filters.find(filter => filter.frequency === frequency);
    filter.gainNode.gain.value = gain;
  }

  setGain (gain) {
    this.outputNode.gain.value = gain;
  }

  _generateFilter () {
    const frequencies = this.frequencies;

    this.filters = frequencies.map((frequency, index) => {
      const filterNode = this.context.createBiquadFilter();
      const gainNode = this.context.createGain();
      filterNode.gain.value = -40;

      filterNode.frequency.setValueAtTime(frequency, this.context.currentTime);
      filterNode.Q.setValueAtTime(this.defaultQ, this.context.currentTime);
      if (index === 0) {
        filterNode.type = 'highshelf';

      }
      else if (index === frequencies.length - 1) {
        filterNode.type = 'lowshelf';
      }
      else {
        filterNode.type = 'peaking';
      }

      this.inputNode.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.outputNode);

      return { frequency, filterNode, gainNode };
    });
  }
}