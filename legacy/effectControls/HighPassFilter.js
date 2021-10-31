import { EffectControls } from './EffectControls';
import { HighPassFilter } from '../../lib/effects/Filter';

export class HighPassFilterControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'High Pass Filter');
    this.initEffect(HighPassFilter);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Frequency', { value: 350, min: 1, max: 22050 }, e => {
      const value = parseFloat(e.target.value);
      this.effector.setFrequency(value);
    });
    this._generateRange('Q', { value: 20000, min: 1, max: 100000 }, e => {
      const value = parseFloat(e.target.value) / 10000;
      this.effector.setQ(value);
    });
    return wrapper;
  }
}

