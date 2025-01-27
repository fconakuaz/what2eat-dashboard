import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { MyPreferences } from './MyPreferences';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import { BadgeIngredient } from './BadgeIngredient';
export function AccordionFilter() {
  const t = useTranslations('HomePage');
  const { ingredientsToInclude } = useIncludeFoodStore();
  const { ingredientsToExclude } = useExcludeFoodStore();
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* My preferences */}
      <AccordionItem value="item-3">
        <AccordionTrigger>{t('my_preferences')}</AccordionTrigger>
        <AccordionContent>
          <MyPreferences />
        </AccordionContent>
      </AccordionItem>

      {/* Includ Food */}
      <AccordionItem value="item-1">
        <AccordionTrigger>{t('include_foods')}</AccordionTrigger>
        <AccordionContent>
          {ingredientsToInclude.map(({ name, state }, index) => (
            <BadgeIngredient
              key={index}
              name={name}
              state={state}
              type="include"
            />
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Exclude Food */}
      <AccordionItem value="item-2">
        <AccordionTrigger>{t('exclude_foods')}</AccordionTrigger>
        <AccordionContent>
          {ingredientsToExclude.map(({ name, state }, index) => (
            <BadgeIngredient
              key={index}
              name={name}
              state={state}
              type="exclude"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
