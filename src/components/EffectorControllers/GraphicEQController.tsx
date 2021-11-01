import { GraphicEQ } from '../../core/effects/GraphicEQ';
import { useEffects } from '../../hooks/useEffects';
import ControlRange from '../ControlRange';

interface Props {
  effect: GraphicEQ;
}
const GraphicEQController = ({ effect }: Props) => {
  const { removeEffect } = useEffects();

  const remove = () => {
    removeEffect(effect.id);
  };

  return (
    <div>
      {effect.getFilters().forEach((filter) => {
        return (
          <ControlRange
            label={`${filter.frequency}hz`}
            defaultValue={0}
            min={-40}
            max={40}
            onChange={(value) => effect.setFrequencyGain(filter.frequency, value)}
          />
        );
      })}
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default GraphicEQController;
