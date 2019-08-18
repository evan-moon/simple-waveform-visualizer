import { Effect } from './Effect';

export class ConvolutionReverb extends Effect {
  constructor (context, options) {
    const defaultOption = {
      mix: 0.5,
      time: 0.01,
      decay: 0.01,
    };
    super(context, defaultOption, options);

    this.reverbNode = context.createConvolver();
    this.wetNode = context.createGain();
    this.dryNode = context.createGain();

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
