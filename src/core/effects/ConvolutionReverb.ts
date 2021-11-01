import { Effect } from './Effect';

interface Options {
  mix: number;
  time: number;
  decay: number;
  gain: number;
}
export class ConvolutionReverb extends Effect<Options> {
  reverbNode: ConvolverNode;
  wetNode: GainNode;
  dryNode: GainNode;

  constructor(context: AudioContext, options?: Options) {
    const defaultOption = {
      mix: 0.5,
      time: 0.01,
      decay: 0.01,
      gain: 1,
    };
    super(context, 'convolutionReverb', defaultOption, options);

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

  setMix(value: number) {
    // 0 ~ 1 (dry ~ wet)
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setTime(value: number) {
    this.options.time = value;
    this._generateImpulseResponse();
  }

  setDecay(value: number) {
    this.options.decay = value;
    this._generateImpulseResponse();
  }

  _generateImpulseResponse() {
    const sampleRate = this.context.sampleRate;
    const length = sampleRate * this.options.time;
    const impulse = this.context.createBuffer(2, length, sampleRate);

    const leftImpulse = impulse.getChannelData(0);
    const rightImpulse = impulse.getChannelData(1);

    const decay = this.options.decay;
    for (let i = 0; i < length; i++) {
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
