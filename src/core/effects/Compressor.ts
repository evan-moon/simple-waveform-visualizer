import { Effect } from './Effect';

interface Options {
  gain: number;
  threshold: number;
  knee: number;
  attack: number;
  release: number;
  ratio: number;
}
export class Compressor extends Effect<Options> {
  compressorNode: DynamicsCompressorNode;

  constructor(context: AudioContext, options?: Options) {
    const defaultOption = {
      threshold: -24,
      knee: 30,
      attack: 0.003,
      release: 0.25,
      ratio: 12,
      gain: 1,
    };
    super(context, 'compressor', defaultOption, options);
    this.compressorNode = context.createDynamicsCompressor();

    const t = this.context.currentTime;
    this.compressorNode.threshold.setValueAtTime(this.options.threshold, t);
    this.compressorNode.knee.setValueAtTime(this.options.knee, t);
    this.compressorNode.attack.setValueAtTime(this.options.attack, t);
    this.compressorNode.release.setValueAtTime(this.options.release, t);
    this.compressorNode.ratio.setValueAtTime(this.options.ratio, t);

    this.inputNode.connect(this.compressorNode);
    this.compressorNode.connect(this.outputNode);
  }

  setThreshold(value: number) {
    const t = this.context.currentTime;
    this.compressorNode.threshold.setValueAtTime(value, t);
  }

  setKnee(value: number) {
    const t = this.context.currentTime;
    this.compressorNode.knee.setValueAtTime(value, t);
  }

  setAttack(value: number) {
    const t = this.context.currentTime;
    this.compressorNode.attack.setValueAtTime(value, t);
  }

  setRelease(value: number) {
    const t = this.context.currentTime;
    this.compressorNode.release.setValueAtTime(value, t);
  }

  setRatio(value: number) {
    const t = this.context.currentTime;
    this.compressorNode.ratio.setValueAtTime(value, t);
  }
}
