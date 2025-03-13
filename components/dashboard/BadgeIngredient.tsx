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
import { Check, Plus } from 'lucide-react';

interface Props {
  name: string;
  type?: undefined | 'include' | 'exclude';
  state: boolean;
}

export const BadgeIngredient: FC<Props> = ({ name, state, type }): any => {
  const { toggleIncludeIngredientState } = useIncludeFoodStore();
  const { toggleExcludeIngredientState } = useExcludeFoodStore();
  const t = useTranslations('HomePage');
  const f = useTranslations('Food');

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
            className="mr-2 mb-3 px-3 py-1 cursor-pointer"
          >
            {state ? (
              <Check className="w-3 h-3 mr-1" />
            ) : (
              <Plus className="w-3 h-3 mr-1" />
            )}
            {f(name)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {state ? t('legendDesactivateBadge') : t('legendActivateBadge')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
