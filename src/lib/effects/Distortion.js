import { Effect } from './Effect';

export class Distortion extends Effect {
  constructor (context, options) {
    const defaultOption = {
      gain: 1,
    };
    super(context, defaultOption, options);

    this.waveShaperNode = this.context.createWaveShaper();
    this.inputNode = this.waveShaperNode;
    this.outputNode = this.waveShaperNode;

    this.adjustGain();
  }

  setGain (gain) {
    this.options.gain = gain;
    this.adjustGain();
  }

  adjustGain () {
    const gain = this.options.gain * 100;
    const sampleRate = this.context.sampleRate;
    const curve = new Float32Array(sampleRate);
    const deg = Math.PI / 100;
    let x;

    for (let i = 0; i < sampleRate; ++i) {
      x = i * 2 / sampleRate - 1;
      curve[i] = (3 + gain) * x * 20 * deg / (Math.PI + gain * Math.abs(x));
    }

    console.log(gain);
    this.waveShaperNode.curve = curve;
  }
}