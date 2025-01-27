import { FC } from 'react';
import { Badge } from '../ui/badge';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';
import { useTranslations } from 'next-intl';

interface Props {
  name: string;
  type?: undefined | 'include' | 'exclude';
  state: boolean;
}

export const BadgeIngredient: FC<Props> = ({ name, state, type }): any => {
  const { toggleIncludeIngredientState } = useIncludeFoodStore();
  const { toggleExcludeIngredientState } = useExcludeFoodStore();
  const t = useTranslations('HomePage');

  const handleClick = () => {
    type && 'include' && toggleIncludeIngredientState(name); // Cambia el estado del ingrediente en el store
    type && 'exclude' && toggleExcludeIngredientState(name); // Cambia el estado del ingrediente en el store
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            onClick={handleClick}
            variant={state ? 'default' : 'outline'}
            className="mr-1 mb-1 cursor-pointer"
          >
            {name}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {state ? t('legendDesactivateBadge') : t('legendActivateBadge')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
