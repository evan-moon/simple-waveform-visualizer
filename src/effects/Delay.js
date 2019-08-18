import { Effect } from './Effect';

export class Delay extends Effect {
  constructor (context, options) {
    const defaultOption = {
      mix: 0.5,
      feedback: 0.5,
      time: 0.3,
    };
    super(context, defaultOption, options);

    this.dryNode = this.context.createGain();
    this.wetNode = this.context.createGain();
    this.feedbackNode = this.context.createGain();
    this.delayNode = this.context.createDelay();

    this.inputNode.connect(this.dryNode);
    this.dryNode.connect(this.outputNode);

    // Feedback Loop
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.delayNode);

    this.inputNode.connect(this.delayNode);
    this.delayNode.connect(this.wetNode);
    this.wetNode.connect(this.outputNode);
  }

  setMix (value) {
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setTime (value) {
    this.options.time = value;
    this.delayNode.delayTime.setValueAtTime(value, this.context.currentTime);
  }

  setFeedback (value) {
    this.options.feedback = value;
    this.feedbackNode.gain.setValueAtTime(value, this.context.currentTime);
  }
}