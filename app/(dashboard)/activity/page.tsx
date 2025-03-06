'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useActivityStore } from 'app/store/activityStore';

export default function ActivityPage() {
  const { activities, addActivity } = useActivityStore();

  const [formData, setFormData] = useState({
    steps: '',
    caloriesBurned: '',
    distanceMeters: '',
    activeMinutes: '',
    heartPoints: '',
    moveMinutes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      date: new Date().toLocaleDateString(),
      steps: parseInt(formData.steps),
      caloriesBurned: parseFloat(formData.caloriesBurned),
      distanceMeters: parseFloat(formData.distanceMeters),
      activeMinutes: parseInt(formData.activeMinutes),
      heartPoints: parseInt(formData.heartPoints),
      moveMinutes: parseInt(formData.moveMinutes)
    });

    setFormData({
      steps: '',
      caloriesBurned: '',
      distanceMeters: '',
      activeMinutes: '',
      heartPoints: '',
      moveMinutes: ''
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* 📋 Formulario */}
      <Card className="md:w-1/3 w-full p-4">
        <CardHeader>
          <CardTitle>Registrar Actividad Física</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <Input
                  type="number"
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  required
                />
              </div>
            ))}
            <Button type="submit" className="mt-2">
              Guardar Registro
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 📊 Visualización */}
      <div className="md:w-2/3 w-full flex flex-col gap-6">
        {/* Tabla de Registros */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Pasos</TableHead>
                  <TableHead>Calorías</TableHead>
                  <TableHead>Distancia (m)</TableHead>
                  <TableHead>Min. Activos</TableHead>
                  <TableHead>Puntos Cardíacos</TableHead>
                  <TableHead>Min. Movimiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.steps}</TableCell>
                      <TableCell>{activity.caloriesBurned}</TableCell>
                      <TableCell>{activity.distanceMeters}</TableCell>
                      <TableCell>{activity.activeMinutes}</TableCell>
                      <TableCell>{activity.heartPoints}</TableCell>
                      <TableCell>{activity.moveMinutes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No hay registros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Gráficas */}
        {[
          { title: 'Pasos diarios', key: 'steps' },
          { title: 'Calorías quemadas', key: 'caloriesBurned' },
          { title: 'Distancia recorrida (m)', key: 'distanceMeters' },
          { title: 'Minutos activos', key: 'activeMinutes' },
          { title: 'Puntos cardíacos', key: 'heartPoints' },
          { title: 'Minutos en movimiento', key: 'moveMinutes' }
        ].map(({ title, key }) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={activities.map((act) => ({
                    date: act.date,
                    value: 1 // 🔹 Asegura que el valor es un número
                  }))}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
