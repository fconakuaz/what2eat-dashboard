'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem
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
import {
  ArrowLeft,
  Ruler,
  Scale,
  Calendar,
  User,
  Utensils,
  Heart,
  Target,
  PartyPopper,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

export default function Wizard() {
  const router = useRouter();
  const { setUser, user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

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

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleFinish = () => {
    setUser(formData);
    router.push('/');
  };

  const steps = [
    {
      icon: (
        <PartyPopper className="w-20 h-20 mt-5 mb-4 text-primary/70 animate-pulse " />
      ),
      title: '¡Te damos la bienvenida a What2Eat!',
      description:
        'Antes de empezar, cuéntanos un poco sobre ti para personalizar tu experiencia.',
      content: <></>
    },
    {
      label: 'Altura (m)',
      field: 'height',
      type: 'input',
      icon: <Ruler className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Ingresa tu altura en metros para calcular mejor tu perfil nutricional.'
    },
    {
      label: 'Peso (kg)',
      field: 'weight',
      type: 'input',
      icon: <Scale className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Proporciona tu peso actual para personalizar mejor tu alimentación.'
    },
    {
      label: 'Edad',
      field: 'age',
      type: 'input',
      icon: <Calendar className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Indica tu edad para ajustar recomendaciones según tu etapa de vida.'
    },
    {
      label: 'Padecimientos',
      field: 'conditions',
      type: 'input',
      icon: <Heart className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Si tienes alguna condición de salud, la tomaremos en cuenta.'
    },
    {
      label: 'Género',
      field: 'gender',
      type: 'select',
      icon: <User className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu género para ajustar tu plan de alimentación.',
      options: ['Masculino', 'Femenino', 'Otro']
    },
    {
      label: 'Tipo de alimentación',
      field: 'diet',
      type: 'select',
      icon: <Utensils className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Selecciona tu tipo de alimentación para filtrar recomendaciones.',
      options: ['Omnívora', 'Vegetariana', 'Vegana']
    },
    {
      label: 'Objetivo',
      field: 'goal',
      type: 'select',
      icon: <Target className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu objetivo principal con este programa.',
      options: ['Bajar de peso', 'Ganar masa muscular', 'Mantenerme saludable']
    },
    {
      title: '¡Listo!',
      description:
        'Ahora podemos personalizar mejor tus menús de acuerdo a tus necesidades.',
      icon: <BadgeCheck className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      content: (
        <Button className="mt-4 w-full sm:w-auto" onClick={handleFinish}>
          Crear tu primer menú del día
        </Button>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center pt-[calc(50vh-250px)] min-h-[calc(100vh-170px)]">
      <Carousel className="w-full max-w-[calc(100vw-30px)] h-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CarouselContent>
          {steps.map((step, index) => (
            <CarouselItem
              key={index}
              className={currentStep === index ? 'block' : 'hidden'}
            >
              <div className="p-2">
                <Card className="w-full text-center">
                  <CardContent className="p-6 flex flex-col items-center">
                    {step.icon && <div className="mb-2 ">{step.icon}</div>}
                    {step.title && (
                      <h2 className="text-xl sm:text-2xl mb-1 font-bold">
                        {step.title}
                      </h2>
                    )}
                    {step.description && (
                      <p className="mt-0 mb-4 text-sm sm:text-base/tight">
                        {step.description}
                      </p>
                    )}
                    {step.type === 'input' && (
                      <div className="w-full mt-4">
                        <Label className="text-sm sm:text-base">
                          {step.label}
                        </Label>
                        <Input
                          type="text"
                          value={0}
                          onChange={(e) =>
                            handleChange(step.field, e.target.value)
                          }
                          className="text-sm sm:text-base"
                        />
                      </div>
                    )}
                    {step.type === 'select' && (
                      <div className="w-full mt-4">
                        <Label className="text-sm sm:text-base">
                          {step.label}
                        </Label>
                        <Select
                          value={'0'}
                          onValueChange={(value) =>
                            handleChange(step.field, value)
                          }
                        >
                          <SelectTrigger className="text-sm sm:text-base">
                            <SelectValue
                              placeholder={`Selecciona tu ${step.label.toLowerCase()}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {step.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {step.content}
                    <div className="flex justify-between w-full mt-11">
                      {index > 0 && index < steps.length - 1 && (
                        <Button
                          variant="outline"
                          className="w-2/5 sm:w-auto flex items-center gap-2"
                          onClick={handlePrevious}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Anterior
                        </Button>
                      )}
                      {index < steps.length - 1 && (
                        <Button
                          className="ml-auto w-2/5 sm:w-auto"
                          onClick={handleNext}
                        >
                          Siguiente
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
