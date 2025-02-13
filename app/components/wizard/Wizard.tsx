'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from 'app/store/authStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select';

export default function Wizard() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    height: '1.78',
    weight: '107',
    age: '41',
    gender: 'Masculino',
    diet: 'Omnívora',
    goal: 'Bajar de peso',
    conditions: 'Diabetes y Colesterol'
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center pt-[calc(50vh-170px)] min-h-screen ">
      <Carousel className="w-full max-w-[calc(100vw-130px)] h-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CarouselContent>
          {/* Pantalla de Bienvenida */}
          <CarouselItem>
            <div className="p-2">
              <Card className="w-full text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    ¡Te damos la bienvenida a What2Eat!
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    Antes de empezar, cuéntanos un poco sobre ti para
                    personalizar tu experiencia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          {/* Campos de información */}
          {[
            { label: 'Altura (m)', field: 'height' },
            { label: 'Peso (kg)', field: 'weight' },
            { label: 'Edad', field: 'age' },
            { label: 'Padecimientos', field: 'conditions' }
          ].map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Card className="w-full">
                  <CardContent className="p-4 flex flex-col">
                    <Label className="text-sm sm:text-base">{item.label}</Label>
                    <Input
                      type="text"
                      value={0}
                      onChange={(e) => handleChange(item.field, e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}

          {/* Selecciones de opciones */}
          {[
            {
              label: 'Género',
              field: 'gender',
              options: ['Masculino', 'Femenino', 'Otro']
            },
            {
              label: 'Tipo de alimentación',
              field: 'diet',
              options: ['Omnívora', 'Vegetariana', 'Vegana']
            },
            {
              label: 'Objetivo',
              field: 'goal',
              options: [
                'Bajar de peso',
                'Ganar masa muscular',
                'Mantenerme saludable'
              ]
            }
          ].map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Card className="w-full">
                  <CardContent className="p-4 flex flex-col">
                    <Label className="text-sm sm:text-base">{item.label}</Label>
                    <Select
                      value={'0'}
                      onValueChange={(value) => handleChange(item.field, value)}
                    >
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue
                          placeholder={`Selecciona tu ${item.label.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}

          {/* Pantalla Final */}
          <CarouselItem>
            <div className="p-2">
              <Card className="w-full text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <h2 className="text-xl sm:text-2xl font-bold">¡Listo!</h2>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    Ahora podemos personalizar mejor tus menús.
                  </p>
                  <Button
                    className="mt-4 w-full sm:w-auto"
                    onClick={handleFinish}
                  >
                    Finalizar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
