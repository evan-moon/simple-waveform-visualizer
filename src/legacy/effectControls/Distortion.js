import { EffectControls } from './EffectControls';
import { Distortion } from '../effects/Distortion';

export class DistortionControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Distortion');
    this.initEffect(Distortion);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Gain', { value: 50, min: 0, max: 100  }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setGain(value);
    });

    return wrapper;
  }
}