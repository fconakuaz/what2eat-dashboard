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
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useActivityStore } from 'app/store/activityStore';
import { DrawerActivity } from 'app/components/activities/DrawerActivity';

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
    <div className="flex flex-col md:flex-col gap-6 p-6">
      <DrawerActivity />

      {/* 📊 Visualización */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Pasos diarios', key: 'steps' },
          { title: 'Calorías quemadas', key: 'caloriesBurned' },
          { title: 'Distancia recorrida (m)', key: 'distanceMeters' },
          { title: 'Minutos activos', key: 'activeMinutes' }
        ].map(({ title, key }) => (
          <Card key={key} className="w-full">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={activities}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={key} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
                {activities.map((activity) => {
                  const activityName =
                    activityTypes.find((a) => a.id === activity.activityId)
                      ?.name || 'Desconocida';

                  return (
                    <TableRow key={activity.id}>
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
  );
}
