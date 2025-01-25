import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { MyPreferences } from './MyPreferences';
export function AccordionFilter() {
  const t = useTranslations('HomePage');
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
        <AccordionContent>- Tomate</AccordionContent>
      </AccordionItem>

      {/* Exclude Food */}
      <AccordionItem value="item-2">
        <AccordionTrigger>{t('exclude_foods')}</AccordionTrigger>
        <AccordionContent>- Cacahuates</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
