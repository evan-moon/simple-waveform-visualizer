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

export class LowPassCombFilter {
  constructor (context, options) {
    const defaultOption = {
      frequency: 440,
      delay: 0.7,
      resonance: 0.5,
    };

    this.context = context;
    this.options = Object.assign({}, defaultOption, options);

    const { frequency, delay, resonance } = this.options;

    this.inputNode = this.context.createGain();
    this.filterNode = this.context.createBiquadFilter({ type: 'lowpass', frequency });
    this.delayNode = this.context.createDelay(delay);
    this.gainNode = this.context.createGain();
    this.outputNode = this.context.createGain();
    this.gainNode.gain.setValueAtTime(resonance, context.currentTime);

    this.inputNode
      .connect(this.delayNode)
      .connect(this.filterNode)
      .connect(this.gainNode)
      .connect(this.inputNode)
      .connect(this.outputNode);
  }

  setFrequency (value) {
    this.filterNode.frequency.setValueAtTime(value, this.context.currentTime);
  }

  setDelay (value) {
    this.delayNode.delayTime.setValueAtTime(value, this.context.currentTime);
  }

  setResonance (value) {
    this.options.resonance = value;
    this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
  }
}
