'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useHealthStore } from 'app/store/healthStore';

export default function ProgressPage() {
  const { records, addRecord } = useHealthStore();
  const [weight, setWeight] = useState('');
  const [bodyMassIndex, setBodyMassIndex] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !bodyMassIndex) return;

    addRecord({
      date: new Date().toLocaleDateString(),
      weight: parseFloat(weight),
      bodyMassIndex: parseFloat(bodyMassIndex)
    });

    setWeight('');
    setBodyMassIndex('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* 📋 IZQUIERDA: FORMULARIO */}
      <Card className="md:w-1/3 w-full p-4">
        <CardHeader>
          <CardTitle>Registro de datos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Peso (kg)</label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Índice de Masa Corporal
              </label>
              <Input
                type="number"
                step="0.1"
                value={bodyMassIndex}
                onChange={(e) => setBodyMassIndex(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-2">
              Guardar Registro
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 📊 DERECHA: GRÁFICAS */}
      <div className="md:w-2/3 w-full flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolución del Peso</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={records}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Índice de Masa Corporal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={records}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bodyMassIndex" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
