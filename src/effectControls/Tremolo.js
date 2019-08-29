import { EffectControls } from './EffectControls';
import { Tremolo } from '../effects/Tremolo';

export class TremoloControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Tremolo');
    this.initEffect(Tremolo);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Dry/Wet', { value: 80, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setMix(value);
    });
    this._generateRange('Speed', { value: 40, min: 0, max: 200 }, e => {
      const value = parseFloat(e.target.value) / 10;
      this.effector.setSpeed(value);
    });
    this._generateRange('Depth', { value: 100, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setDepth(value);
    });

    return wrapper;
  }
}