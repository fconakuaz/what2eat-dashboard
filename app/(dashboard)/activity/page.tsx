'use client';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useActivityStore } from 'app/store/activityStore';
import { DrawerActivity } from 'app/components/activities/DrawerActivity';
import { BarChartActivities } from 'app/components/charts/BarChart';
import { Button } from '@/components/ui/button';
import { arrChartsActivities, exportToExcel } from './util';
import { Share } from 'lucide-react';

export default function ActivityPage() {
  const {
    activities,
    currentPage,
    totalPages,
    setPage,
    fetchActivityTypes,
    fetchActivityRecords
  } = useActivityStore();

  useEffect(() => {
    fetchActivityTypes();
  }, []);

  useEffect(() => {
    fetchActivityRecords(currentPage);
  }, [currentPage]);

  const handleExportToExcel = () => {
    exportToExcel(activities);
  };

  return (
    <div className="flex flex-col md:flex-col gap-6 p-6 max-w-full justify-center items-center ">
      <div className="flex flex-col md:flex-col gap-6 p-6 max-w-[89vw] md:max-w-[900px] ">
        <DrawerActivity />

        {/* Gráficas */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {arrChartsActivities.map(({ title, key }) => (
            <BarChartActivities
              key={key}
              dataKey={key}
              title={title}
              data={activities.group}
            />
          ))}
        </div>

        {/* Tabla de Registros */}
        <div className="max-w-[87vw] md:max-w-[100vw] w-full flex flex-col gap-6">
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle>Historial de Actividad</CardTitle>
              <Button onClick={handleExportToExcel} variant="outline">
                <Share className="size-2" /> Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Actividad</TableHead>
                    <TableHead>Pasos</TableHead>
                    <TableHead>Calorías</TableHead>
                    <TableHead>Distancia (m)</TableHead>
                    <TableHead>Min. Activos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.all.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(activity.startDateTime).toLocaleDateString(
                          'es-ES'
                        )}
                      </TableCell>
                      <TableCell>{activity?.activity?.name}</TableCell>
                      <TableCell>
                        {activity.steps?.toLocaleString('en-US') ?? '-'}
                      </TableCell>
                      <TableCell>
                        {activity.caloriesBurned?.toLocaleString('en-US') ??
                          '-'}
                      </TableCell>
                      <TableCell>
                        {activity.distanceMeters?.toLocaleString('en-US') ??
                          '-'}
                      </TableCell>
                      <TableCell>
                        {activity.activeMinutes?.toLocaleString('en-US') ?? '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Controles de Paginación */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
