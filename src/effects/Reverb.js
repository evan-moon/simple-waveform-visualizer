import { LowPassCombFilter } from './Filter';

export class ConvolutionReverb {
  constructor (context, options) {
    const defaultOption = {
      mix: 0.5,
      time: 0.01,
      decay: 0.01,
    };
    this.context = context;
    this.options = Object.assign({}, defaultOption, options);

    this.inputNode = context.createGain();
    this.reverbNode = context.createConvolver();
    this.wetNode = context.createGain();
    this.dryNode = context.createGain();
    this.outputNode = context.createGain();

    this.inputNode.connect(this.reverbNode);
    this.inputNode.connect(this.dryNode);

    this.reverbNode.connect(this.wetNode);

    this.wetNode.connect(this.outputNode);
    this.dryNode.connect(this.outputNode);

    this._generateImpulseResponse();
  }

  setMix (value) {
    // 0 ~ 1 (dry ~ wet)
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setTime (value) {
    this.options.time = value;
    this._generateImpulseResponse();
  }

  setDecay (value) {
    this.options.decay = value;
    this._generateImpulseResponse();
  }

  setGain (value) {
    this.options.gain = value;
    this.outputNode.gain.value = value;
  }

  _generateImpulseResponse () {
    const sampleRate = this.context.sampleRate;
    const length = sampleRate * this.options.time;
    const impulse = this.context.createBuffer(2, length, sampleRate);

    const leftImpulse = impulse.getChannelData(0);
    const rightImpulse = impulse.getChannelData(1);

    const decay = this.options.decay;
    for (let i = 0; i < length; i ++) {
      leftImpulse[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      rightImpulse[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }

    if (this.reverbNode.buffer) {
      this.inputNode.disconnect(this.reverbNode);
      this.reverbNode.disconnect(this.wetNode);

      this.reverbNode = this.context.createConvolver();
      this.inputNode.connect(this.reverbNode);
      this.reverbNode.connect(this.wetNode);
    }

    this.reverbNode.buffer = impulse;
  }
}

export class AlgorithmReverb {
  constructor (context, options) {
    const defaultOption = {
      mix: 0.5,
      roomSize: 3,
      dampening: 3,
    };
    const sampleRate = context.sampleRate;

    this.context = context;
    this.options = Object.assign({}, defaultOption, options);

    this.inputNode = this.context.createGain();
    this.wetNode = this.context.createGain();
    this.dryNode = this.context.createGain();

    this.splitter = this.context.createChannelSplitter(2);
    this.merger = this.context.createChannelMerger(2);

    this.outputNode = context.createGain();

    this.combFilters = [1557, 1617, 1491, 1422, 1277, 1356, 1188, 1116].map(delayPerSecond => {
      return new LowPassCombFilter(this.context, {
        delay: delayPerSecond / sampleRate,
        frequency: this.options.dampening,
      });
    });
    this.allFilters = [225, 556, 441, 341].map(frequency => this.context.createBiquadFilter({ type: 'allpass', frequency }));

    const combLeft = this.combFilters.slice(0, 1);
    const combRight = this.combFilters.slice(7);

    this.inputNode.connect(this.wetNode).connect(this.splitter);
    this.inputNode.connect(this.dryNode).connect(this.outputNode);

    combLeft.forEach(combFilter => {
      this.splitter.connect(combFilter.inputNode, 0);
      combFilter.outputNode.connect(this.merger, 0, 0);
    });
    combRight.forEach(combFilter => {
      this.splitter.connect(combFilter.inputNode, 1)
      combFilter.outputNode.connect(this.merger, 0, 1);
    });

    this.merger
      .connect(this.allFilters[0])
      .connect(this.allFilters[1])
      .connect(this.allFilters[2])
      .connect(this.allFilters[3])
      .connect(this.outputNode);
  }

  setMix (value) {
    // 0 ~ 1 (dry ~ wet)
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setRoomSize (value) {
    this.combFilters.forEach(combFilter => combFilter.setGain(value));
  }

  setDampening (value) {
    this.combFilters.forEach(combFilter => combFilter.setFrequency(value));
  }
}