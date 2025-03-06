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
import { useHealthStore } from 'app/store/healthStore';

export default function ProgressPage() {
  const {
    dates,
    weight,
    bmi,
    bodyFat,
    bodyWater,
    bodyProtein,
    basalMetabolism,
    visceralFat,
    boneMass,
    addRecord
  } = useHealthStore();

  const [formData, setFormData] = useState({
    weight: '',
    bmi: '',
    bodyFat: '',
    bodyWater: '',
    bodyProtein: '',
    basalMetabolism: '',
    visceralFat: '',
    boneMass: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecord({
      date: new Date().toLocaleDateString(),
      weight: parseFloat(formData.weight),
      bmi: parseFloat(formData.bmi),
      bodyFat: parseFloat(formData.bodyFat),
      bodyWater: parseFloat(formData.bodyWater),
      bodyProtein: parseFloat(formData.bodyProtein),
      basalMetabolism: parseFloat(formData.basalMetabolism),
      visceralFat: parseFloat(formData.visceralFat),
      boneMass: parseFloat(formData.boneMass)
    });

    setFormData({
      weight: '',
      bmi: '',
      bodyFat: '',
      bodyWater: '',
      bodyProtein: '',
      basalMetabolism: '',
      visceralFat: '',
      boneMass: ''
    });
  };

  const generateChartData = (dataArray: number[]) =>
    dates.map((date, index) => ({
      date,
      value: dataArray[index]
    }));

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* 📋 Formulario */}
      <Card className="md:w-1/3 w-full p-4">
        <CardHeader>
          <CardTitle>Registrar Datos</CardTitle>
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

      {/* 📊 Gráficas */}
      <div className="md:w-2/3 w-full flex flex-col gap-6">
        {[
          { title: 'Evolución del Peso', data: weight },
          { title: 'Índice de Masa Corporal', data: bmi },
          { title: 'Porcentaje de Grasa Corporal', data: bodyFat },
          { title: 'Porcentaje de Agua Corporal', data: bodyWater },
          { title: 'Proteína Corporal', data: bodyProtein },
          { title: 'Metabolismo Basal', data: basalMetabolism },
          { title: 'Grasa Visceral', data: visceralFat },
          { title: 'Masa Ósea', data: boneMass }
        ].map(({ title, data }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={generateChartData(data)}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
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
