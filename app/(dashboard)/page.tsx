'use client';

import { useState } from 'react';
import { AccordionFilter } from '@/components/dashboard/AccordionFilter';
import { Button } from '@/components/ui/button';
import { runGemini, GenerateHTMLFromJson } from '../AI/getRecipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Info, PlusCircle, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [menu, setMenu] = useState<any>([]);

  async function run() {
    try {
      console.log('Generando menú del día...');
      // Simula la generación del menú
      const response = await runGemini();
      console.log('Menú generado:', response);
      setMenu(response);
    } catch (error) {
      console.error('Error al generar el menú:', error);
    }
  }
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
          <div className="w-full grid place-items-end">
            <Button size="sm" className="h-8 gap-1" onClick={run}>
              <Sparkles className="h-3.5 w-3.5" />
              <span className="  sm:not-sr-only sm:whitespace-nowrap">
                Crear menú del día
              </span>
            </Button>
          </div>

          {/* Contenedor principal */}
          <div className="grid w-full gap-4 md:grid-cols-[30%_70%]">
            {/* Columna izquierda (30% en pantallas grandes, 100% en móviles) */}
            <div className="h-auto">
              <AccordionFilter />
            </div>

            {/* Columna derecha (70% en pantallas grandes, 100% en móviles) */}
            <div className="bg-muted/30 px-4 py-3 md:px-10 md:py-8 ml-0 mr-0 md:ml-3 md:mr-4">
              {/* Renderizar el contenido dinámico */}
              {menu && Object.keys(menu).length > 0 ? (
                <GenerateHTMLFromJson json={menu} />
              ) : (
                <p className="text-muted-foreground">
                  <Info className="mb-2" /> Da clic en crear menú del día para
                  mostrar el menú de hoy...
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default HomePage;
