import { Effect } from './Effect';

export class Compressor extends Effect {
  constructor (context, options) {
    const defaultOption = {
      threshold: -24,
      knee: 30,
      attack: 0.003,
      release: 0.250,
      ratio: 12,
    };
    super(context, defaultOption, options);
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

  setThreshold (value) {
    const t = this.context.currentTime;
    this.compressorNode.threshold.setValueAtTime(value, t);
  }

  setKnee (value) {
    const t = this.context.currentTime;
    this.compressorNode.knee.setValueAtTime(value, t);
  }

  setAttack (value) {
    const t = this.context.currentTime;
    this.compressorNode.attack.setValueAtTime(value, t);
  }

  setRelease (value) {
    const t = this.context.currentTime;
    this.compressorNode.release.setValueAtTime(value, t);
  }

  setRatio (value) {
    const t = this.context.currentTime;
    this.compressorNode.ratio.setValueAtTime(value, t);
  }
}