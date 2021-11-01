import { Effect } from './Effect';

interface Options {
  mix: number;
  feedback: number;
  time: number;
  gain: number;
}
export class Delay extends Effect<Options> {
  dryNode: GainNode;
  wetNode: GainNode;
  feedbackNode: GainNode;
  delayNode: DelayNode;

  constructor(context: AudioContext, options?: Options) {
    const defaultOption = {
      mix: 0.5,
      feedback: 0.5,
      time: 0.3,
      gain: 1,
    };
    super(context, 'delay', defaultOption, options);

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

    this.setTime(this.options.time);
    this.setFeedback(this.options.feedback);
  }

  setMix(value: number) {
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setTime(value: number) {
    this.options.time = value;
    this.delayNode.delayTime.setValueAtTime(value, this.context.currentTime);
  }

  setFeedback(value: number) {
    this.options.feedback = value;
    this.feedbackNode.gain.setValueAtTime(value, this.context.currentTime);
  }
}
