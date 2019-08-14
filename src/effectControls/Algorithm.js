import { EffectControls } from './EffectControls';
import { AlgorithmReverb } from '../effects/Reverb';

export class AlgorithmReverbControls extends EffectControls {
  constructor (context, options) {
    super(context, options, 'Algorithm Reverb');
    this.initEffect(AlgorithmReverb);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;

    this._generateRange('Dry/Wet', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setMix(value);
    });
    this._generateRange('Room Size', { value: 50, min: 0, max: 100 }, e => {
      const value = parseFloat(e.target.value) / 100;
      this.effector.setRoomSize(value);
    });
    this._generateRange('Dampening', { value: 440, min: 0, max: 22000 }, e => {
      const value = parseFloat(e.target.value);
      this.effector.setDampening(value);
    });

    return wrapper;
  }
}