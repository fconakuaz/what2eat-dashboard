import { FC } from 'react';
import { Badge } from '../ui/badge';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';

interface Props {
  name: string;
  type?: undefined | 'include' | 'exclude';
  state: boolean;
}

export const BadgeIngredient: FC<Props> = ({ name, state, type }): any => {
  const { toggleIncludeIngredientState } = useIncludeFoodStore();
  const { toggleExcludeIngredientState } = useExcludeFoodStore();

  const handleClick = () => {
    type && 'include' && toggleIncludeIngredientState(name); // Cambia el estado del ingrediente en el store
    type && 'exclude' && toggleExcludeIngredientState(name); // Cambia el estado del ingrediente en el store
  };

  return (
    <Badge
      onClick={handleClick}
      variant={state ? 'default' : 'outline'}
      className="mr-1 mb-1"
    >
      {name}
    </Badge>
  );
};
