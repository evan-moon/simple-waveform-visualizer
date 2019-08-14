import { EffectControls } from './EffectControls';
import { ConvolutionReverb } from '../effects/ConvolutionReverb';

export class ConvolutionReverbControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Convolution Reverb');
    this.initEffect(ConvolutionReverb);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Dry/Wet', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setMix(value);
    });
    this._generateRange('Reverb Time', { value: 1, min: 1, max: 200 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setTime(value);
    });
    this._generateRange('Decay', { value: 1, min: 1, max: 200 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setDecay(value);
    });
    this._generateRange('Gain', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setGain(value);
    });

    return wrapper;
  }
}