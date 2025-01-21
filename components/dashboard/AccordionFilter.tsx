import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export function AccordionFilter() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-3">
        <AccordionTrigger>Mis preferencias</AccordionTrigger>
        <AccordionContent>Tipo de alimentación</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Quiero incluir</AccordionTrigger>
        <AccordionContent>- Tomate</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Quiero evitar</AccordionTrigger>
        <AccordionContent>- Cacahuates</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
