'use client';

import { SetStateAction, useCallback, useState } from 'react';
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

import {
  ArrowLeft,
  Ruler,
  Scale,
  Heart,
  PartyPopper,
  ArrowRight,
  BadgeCheck,
  PencilRuler,
  CalendarIcon,
  User,
  Utensils,
  Target
} from 'lucide-react';
import { useProfileStore } from 'app/store/profileStore';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import DatePickerDropdown from '@/components/datePickerWithYearsSelector';

export default function Wizard() {
  const router = useRouter();
  const { profile, setProfile } = useProfileStore(); // Obtener perfil desde Zustand
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (
    field: keyof typeof profile,
    value: string | number | Date
  ) => {
    setProfile({ [field]: value }); // Actualiza el store
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleFinish = () => {
    router.push('/');
  };

  const steps = [
    // 1. ✅ Welcome
    {
      icon: (
        <PartyPopper className="w-20 h-20 mt-5 mb-4 text-primary/70 animate-pulse " />
      ),
      title: '¡Te damos la bienvenida a What2Eat!',
      description:
        'Antes de empezar, cuéntanos un poco sobre ti para personalizar tu experiencia.',
      content: <></>
    },
    // 2. ✅ Metric units
    {
      label: 'Clic aquí para seleccionar',
      field: 'metricUnit',
      type: 'select',
      icon: <PencilRuler className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona la unidad de medida de tu preferencia',
      options: [
        {
          value: 'metric',
          text: 'Metrica (Metros y Kilos)'
        },
        {
          value: 'imperial',
          text: 'Imperial (Pies y Libras)'
        }
      ]
    },
    // 3.  Height
    {
      label: 'Altura',
      field: 'height',
      type: 'input',
      typeInput: 'number',
      icon: <Ruler className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Indica tu altura para ajustar tu plan nutricional.',
      placeholder: '0.0',
      unit: profile.metricUnit === 'imperial' ? 'en pies (ft)' : 'en metros (m)'
    },
    // 4.  Weight
    {
      label: 'Peso',
      field: 'weight',
      type: 'input',
      typeInput: 'number',
      icon: <Scale className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description:
        'Proporciona tu peso actual para personalizar tus recomendaciones.',
      placeholder: '0.0',
      unit:
        profile.metricUnit === 'imperial'
          ? 'en libras (lbs)'
          : 'en kilogramos (kg)'
    },
    // 5.  BirthDate
    {
      label: 'Selecciona tu fecha de nacimiento',
      field: 'birthDate',
      type: 'date',
      icon: <CalendarIcon className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Ayúdanos a adaptar tu nutrición según tu edad.'
    },
    // 4.  Afflictions
    // {
    //   label: 'Padecimientos',
    //   field: 'afflictions',
    //   type: 'input',
    //   icon: <Heart className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
    //   description:
    //     'Si tienes alguna condición de salud, la tomaremos en cuenta.'
    // },
    {
      label: 'Clic aquí para seleccionar',
      field: 'gender',
      type: 'select',
      icon: <User className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu género para ajustar tu plan a la medida.',
      options: [
        {
          value: 'MALE',
          text: '👨 Masculino'
        },
        {
          value: 'FEMALE',
          text: '👩‍🦱 Femenino'
        },
        {
          value: 'OTHER',
          text: '🚫 Prefiero no contestar'
        }
      ]
    },
    {
      label: 'Clic aquí para seleccionar',
      field: 'physicalActivity',
      type: 'select',
      icon: <User className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu nivel de actividad física.',
      options: [
        {
          value: 'SEDENTARY',
          text: 'Sedentario (Ningún ejercicio)'
        },
        {
          value: 'LIGHT',
          text: 'Ligero (1-2 días a la semana)'
        },
        {
          value: 'MODERATE',
          text: 'Moderado (3-4 días a la semana)'
        },
        {
          value: 'HIGH',
          text: 'Alto (5-6 días a la semana)'
        },
        {
          value: 'ATHLETE',
          text: 'Atleta (Alto rendimiento)'
        }
      ]
    },
    {
      label: 'Clic aquí para seleccionar',
      field: 'dietaryPreference',
      type: 'select',
      icon: <Utensils className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu tipo de alimentación preferida.',
      // options: ['NONE', 'VEGETARIAN', 'VEGAN', 'KETO', 'PALEO']
      options: [
        {
          value: 'NONE',
          text: 'Sin restricciones'
        },
        {
          value: 'VEGETARIAN',
          text: 'Vegetariana'
        },
        {
          value: 'PESCETARIAN',
          text: 'Pescetariana'
        },
        {
          value: 'VEGAN',
          text: 'Vegana'
        },
        {
          value: 'KETO',
          text: 'Keto'
        },
        {
          value: 'PALEO',
          text: 'Paleo'
        }
      ]
    },
    {
      label: 'Clic aquí para seleccionar',
      field: 'goal',
      type: 'select',
      icon: <Target className="w-14 h-14 mt-5 mb-2 text-primary/70" />,
      description: 'Selecciona tu objetivo a seguir.',
      options: [
        {
          value: 'lose_weight',
          text: 'Perder peso'
        },
        {
          value: 'gain_muscle',
          text: 'Ganar músculo'
        },
        {
          value: 'maintain_health',
          text: 'Mantenerme saludable'
        },
        {
          value: 'increase_energy',
          text: 'Aumentar mi energía'
        },
        {
          value: 'improve_digestion',
          text: 'Mejorar mi digestión'
        },
        {
          value: 'balanced_diet',
          text: 'Dieta balanceada'
        }
      ]
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

  const [birthDate, setBirthDate] = useState<string>('');

  const handleSetBirthDate = useCallback((value: string) => {
    const dateValue = new Date(value);
    if (!isNaN(dateValue.getTime())) {
      if (dateValue.getFullYear() < 1925) {
        return;
      }
      handleChange('birthDate' as keyof typeof profile, dateValue);
      setBirthDate(value);
    }
  }, []);

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
                    {step.icon && <div className="mb-2">{step.icon}</div>}
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

                    {/* -- Input ---------------- */}
                    {step.type === 'input' && (
                      <div
                        className={`${step?.typeInput === 'number' ? 'w-[185px]' : 'w-full'} mt-4`}
                      >
                        <Label className="text-sm sm:text-base">
                          {step.label} {step.unit}
                        </Label>
                        <Input
                          type={step?.typeInput || 'text'}
                          value={String(
                            profile[step.field as keyof typeof profile] ?? ''
                          )}
                          onChange={(e) =>
                            handleChange(
                              step.field as keyof typeof profile,
                              e.target.value
                            )
                          }
                          className="mt-1 text-sm sm:text-base"
                          placeholder={step?.placeholder}
                        />
                      </div>
                    )}

                    {/* -- Select ---------------- */}
                    {step.type === 'select' && (
                      <div className="w-[250px] mt-4">
                        <Select
                          value={String(
                            profile[step.field as keyof typeof profile] ?? ''
                          )}
                          onValueChange={(value) =>
                            handleChange(
                              step.field as keyof typeof profile,
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={step.label} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {step?.options?.map(({ value, text }, index) => (
                                <SelectItem key={index} value={value}>
                                  {text}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {/* -- Date ---------------- */}
                    {step.type === 'date' && (
                      <DatePickerDropdown
                        value={birthDate}
                        onChange={handleSetBirthDate}
                      />
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
