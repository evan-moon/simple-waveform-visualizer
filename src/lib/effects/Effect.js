import { fromTitleCaseToStartCase } from 'src/utils';

export class Effect {
  constructor (context, defaultOption, options) {
    this.id = `effector-${new Date().getTime()}`;
    this.name = fromTitleCaseToStartCase(this.constructor.name);
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