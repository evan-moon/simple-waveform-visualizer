import { EffectControls } from './EffectControls';
import { GraphicEQ } from '../../lib/effects/GraphicEQ';

export class GraphicEQControls extends EffectControls {
  constructor(context) {
    super(context, 'Graphic EQ');
    this.initEffect(GraphicEQ);
  }

  getControlDOM() {
    const wrapper = this.controllerDOM;
    const filters = this.effector.getFilters();
    filters.forEach((filter) => {
      this._generateRange(
        filter.frequency,
        {
          value: 0,
          min: -40,
          max: 40,
          vertical: true,
        },
        (e) => {
          const value = parseFloat(e.target.value);
          this.effector.setFrequencyGain(filter.frequency, value);
        }
      );
    });

    return wrapper;
  }
}
