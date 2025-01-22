import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { TableAddIngredients } from './TableAddIngredients';
import { useTranslations } from 'next-intl';
export function AccordionFilter() {
  const t = useTranslations('HomePage');
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-3">
        <AccordionTrigger>{t('my_preferences')}</AccordionTrigger>
        <AccordionContent>
          <TableAddIngredients />{' '}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>{t('include_foods')}</AccordionTrigger>
        <AccordionContent>- Tomate</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{t('exclude_foods')}</AccordionTrigger>
        <AccordionContent>- Cacahuates</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
