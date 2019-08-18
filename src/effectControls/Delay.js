import { EffectControls } from './EffectControls';
import { Delay } from '../effects/Delay';

export class DelayControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Delay');
    this.initEffect(Delay);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Dry/Wet', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setMix(value);
    });
    this._generateRange('Time', { value: 30, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setTime(value);
    });
    this._generateRange('Feedback', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setFeedback(value);
    });

    return wrapper;
  }
}