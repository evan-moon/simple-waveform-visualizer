import { useEffects } from '../../hooks/useEffects';
import { CompressorEffectorNode } from '../../models/effects';

interface Props {
  effect: CompressorEffectorNode;
}
const CompressorController = ({ effect }: Props) => {
  const { removeEffect } = useEffects();

  const remove = () => {
    removeEffect(effect.id);
  };

  return (
    <div>
      <button onClick={remove}>제거</button>
    </div>
  );
};

export default CompressorController;
