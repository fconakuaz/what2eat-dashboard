'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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
  const {
    activities,
    activityTypes,
    fetchActivityTypes,
    fetchActivityRecords,
    addActivity
  } = useActivityStore();

  // 📌 Estado del formulario
  const [formData, setFormData] = useState({
    activityId: '', // 🔹 Corregido, antes era activityType
    date: new Date().toISOString().split('T')[0], // 🔹 Formato YYYY-MM-DD
    steps: '',
    caloriesBurned: '',
    distanceMeters: '',
    activeMinutes: ''
  });

  useEffect(() => {
    fetchActivityTypes();
    fetchActivityRecords(); // 🔹 Cargar registros al iniciar
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addActivity({
      date: formData.date,
      activityId: formData.activityId,
      steps: formData.steps ? parseInt(formData.steps) : undefined, // 🔹 Cambiado a undefined
      caloriesBurned: formData.caloriesBurned
        ? parseFloat(formData.caloriesBurned)
        : undefined, // 🔹 Cambiado a undefined
      distanceMeters: formData.distanceMeters
        ? parseFloat(formData.distanceMeters)
        : undefined, // 🔹 Cambiado a undefined
      activeMinutes: formData.activeMinutes
        ? parseInt(formData.activeMinutes)
        : undefined // 🔹 Cambiado a undefined
    });

    setFormData({
      activityId: '',
      date: new Date().toISOString().split('T')[0], // Restablecer fecha a hoy
      steps: '',
      caloriesBurned: '',
      distanceMeters: '',
      activeMinutes: ''
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
            {/* Select de Actividades */}
            <div>
              <label className="block text-sm font-medium">
                Tipo de Actividad
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, activityId: value })
                }
                value={formData.activityId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una actividad" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((activity) => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input de Fecha */}
            <div>
              <label className="block text-sm font-medium">Fecha</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            {/* Otros Campos */}
            {['steps', 'caloriesBurned', 'distanceMeters', 'activeMinutes'].map(
              (key) => (
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
                  />
                </div>
              )
            )}

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
                      <TableCell>{activity.date}</TableCell>
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
