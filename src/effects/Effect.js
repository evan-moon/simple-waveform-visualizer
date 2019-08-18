export class Effect {
  constructor (context, defaultOption, options) {
    this.context = context;
    this.options = Object.assign({}, defaultOption, options);
    this.inputNode = this.context.createGain();
    this.outputNode = this.context.createGain();
  }

  setGain (gain) {
    this.options.gain = gain;
    this.outputNode.gain.setValueAtTime(gain, this.context.currentTime);
  }
}