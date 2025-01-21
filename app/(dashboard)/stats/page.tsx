import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function StatsPage() {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
        <CardDescription>Aquí puede ver sus avances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Barra superior (100% del ancho) */}
          <div className="w-full  *:h-16">Barra de botones</div>

          {/* Contenedor principal */}
          <div className="grid w-full gap-4 md:grid-cols-[30%_70%]">
            {/* Columna izquierda (30% en pantallas grandes, 100% en móviles) */}
            <div className=" h-64">Filtros</div>

            {/* Columna derecha (70% en pantallas grandes, 100% en móviles) */}
            <div className="bg-muted/30 p-2 h-64">Texto del menú del día</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
