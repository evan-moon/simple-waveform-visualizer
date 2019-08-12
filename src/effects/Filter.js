class Filter {
  constructor (context, options, type) {
    const defaultOption = {
      frequency: 350,
      q: 1,
    };
    this.context = context;
    this.options = Object.assign({}, defaultOption, options);

    this.filterNode = context.createBiquadFilter();
    this.filterNode.type = type;
    this.filterNode.frequency.setValueAtTime(this.options.frequency, this.context.currentTime);
    this.filterNode.Q.setValueAtTime(this.options.q, this.context.currentTime);

    this.inputNode = this.filterNode;
    this.outputNode = this.context.createGain();
    this.inputNode.connect(this.outputNode);
  }

  setFrequency (value) {
    // LPF, HPF의 min, max 정해줘야 할듯? 현재는 1~22050
    this.filterNode.frequency.setValueAtTime(value, this.context.currentTime);
  }

  setQ (value) {
    this.filterNode.Q.setValueAtTime(value, this.context.currentTime);
  }
}

export class LowPassFilter extends Filter {
  constructor (context, options) {
    super(context, options, 'lowpass');
  }
}

export class HighPassFilter extends Filter {
  constructor (context, options) {
    super(context, options, 'highpass');
  }
}

export class BandPassFilter extends Filter {
  constructor (context, options) {
    super(context, options, 'bandpass');
  }
}