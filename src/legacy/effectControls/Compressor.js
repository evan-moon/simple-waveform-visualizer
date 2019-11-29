import { EffectControls } from './EffectControls';
import { Compressor } from '../effects/Compressor';

export class CompressorControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Compressor');
    this.initEffect(Compressor);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Threshold', { value: -50, min: -100, max: 0 }, e => {
      const value = parseInt(e.target.value);
      this.effector.setThreshold(value);
    });
    this._generateRange('Knee', { value: 30, min: 0, max: 40 }, e => {
      const value = parseFloat(e.target.value) / 1000;
      this.effector.setKnee(value);
    });
    this._generateRange('Attack', { value: 3, min: 0, max: 1000 }, e => {
      const value = parseFloat(e.target.value) / 1000;
      this.effector.setAttack(value / 1000);
    });
    this._generateRange('Release', { value: 25, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value);
      this.effector.setRelease(value / 100);
    });
    this._generateRange('Ratio', { value: 12, min: 1, max: 20 }, e => {
      const value = parseFloat(e.target.value);
      this.effector.setRatio(value);
    });

    return wrapper;
  }
}