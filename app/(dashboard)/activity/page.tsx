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
import { Flame, Footprints, Hourglass, Ruler } from 'lucide-react';

export default function ActivityPage() {
  const {
    activities,
    activityTypes,
    fetchActivityTypes,
    fetchActivityRecords
  } = useActivityStore();

  useEffect(() => {
    fetchActivityTypes();
    fetchActivityRecords();
  }, []);

  return (
    <div className="flex flex-col md:flex-col gap-6 p-6 max-w-full justify-center items-center ">
      <div className="flex flex-col md:flex-col gap-6 p-6 max-w-[900px] ">
        <DrawerActivity />

        {/* 📊 Visualización */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: (
                <span className="flex flex-row">
                  <Footprints color="#2662d9" className={`size-6 mr-2`} /> Pasos
                  diarios
                </span>
              ),
              key: 'steps'
            },
            {
              title: (
                <span className="flex flex-row">
                  <Flame color="#2662d9" className={`size-6 mr-1`} /> Calorías
                  quemadas
                </span>
              ),
              key: 'caloriesBurned'
            },
            {
              title: (
                <span className="flex flex-row">
                  <Ruler color="#2662d9" className={`size-6 mr-1`} /> Distancia
                  recorrida (m)
                </span>
              ),
              key: 'distanceMeters'
            },
            {
              title: (
                <span className="flex flex-row">
                  <Hourglass color="#2662d9" className={`size-6 mr-1`} />{' '}
                  Minutos activos
                </span>
              ),
              key: 'activeMinutes'
            }
          ].map(({ title, key }) => (
            <BarChartActivities
              key={key}
              dataKey={key}
              title={title}
              data={activities}
            />
          ))}
        </div>

        {/* Tabla de Registros */}
        <div className="max-w-[87vw] md:max-w-[100vw] w-full flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
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
                  {activities.map((activity, index) => {
                    const activityName =
                      activityTypes.find((a) => a.id === activity.activityId)
                        ?.name || 'Desconocida';

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(activity.date).toLocaleDateString('es-ES')}
                        </TableCell>
                        <TableCell>{activityName}</TableCell>
                        <TableCell>{activity.steps ?? '-'}</TableCell>
                        <TableCell>{activity.caloriesBurned ?? '-'}</TableCell>
                        <TableCell>{activity.distanceMeters ?? '-'}</TableCell>
                        <TableCell>{activity.activeMinutes ?? '-'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
