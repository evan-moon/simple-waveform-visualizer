import { EffectControls } from './EffectControls';
import { GraphicEQ } from '../effects/GraphicEQ';

export class GraphicEQControls extends EffectControls {
  constructor (context) {
    super(context, 'Graphic EQ');
    this.initEffect(GraphicEQ);
  }

  getControlDOM () {
    const wrapper = this.controllerDOM;
    const filters = this.effector.getFilters();
    filters.forEach(filter => {
      this._generateRange(filter.frequency, {
        value: 0,
        min: -300,
        max: 300
      }, e => {
        const value = parseFloat(e.target.value) / 100;
        this.effector.setFrequencyGain(filter.frequency, value);
      });
    });

    return wrapper;
  }
}