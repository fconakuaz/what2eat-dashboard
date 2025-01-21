import { AccordionFilter } from '@/components/dashboard/AccordionFilter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PlusCircle, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Menú del día</CardTitle>
        <CardDescription>
          Seleccione sus preferencias y genere un nuevo menú para comer hoy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Barra superior (100% del ancho) */}
          <div className="w-full grid place-items-end *:h-11">
            <Button size="sm" className="h-8 gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Crear menú del día
              </span>
            </Button>
          </div>

          {/* Contenedor principal */}
          <div className="grid w-full gap-4 md:grid-cols-[30%_70%]">
            {/* Columna izquierda (30% en pantallas grandes, 100% en móviles) */}
            <div className=" h-64">
              <AccordionFilter />{' '}
            </div>

            {/* Columna derecha (70% en pantallas grandes, 100% en móviles) */}
            <div className="bg-muted/30 p-2 h-64 ml-3 mr-4 min-h-[72vh] ">
              Texto del menú del día
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
