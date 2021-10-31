import { Effect } from './Effect';

interface Options {
  gain: number;
}
export class Distortion extends Effect<Options> {
  waveShaperNode: WaveShaperNode;

  constructor(context: AudioContext, options?: Options) {
    const defaultOption = {
      gain: 1,
    };
    super(context, 'distortion', defaultOption, options);

    this.waveShaperNode = this.context.createWaveShaper();
    this.waveShaperNode.curve = getWaveShaperCurve(defaultOption.gain, this.context.sampleRate);

    this.inputNode.connect(this.waveShaperNode);
    this.waveShaperNode.connect(this.outputNode);
  }

  override setGain(gain: number) {
    this.options.gain = gain;
    this.waveShaperNode.curve = getWaveShaperCurve(gain, this.context.sampleRate);
  }
}

function getWaveShaperCurve(gain: number, sampleRate: number) {
  const outputGain = gain * 100;
  const curve = new Float32Array(sampleRate);
  const deg = Math.PI / 100;
  let x;

  for (let i = 0; i < sampleRate; ++i) {
    x = (i * 2) / sampleRate - 1;
    curve[i] = ((3 + outputGain) * x * 20 * deg) / (Math.PI + outputGain * Math.abs(x));
  }

  return curve;
}
