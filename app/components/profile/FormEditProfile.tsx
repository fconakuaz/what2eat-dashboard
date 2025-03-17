import { useProfileStore } from 'app/store/profileStore';
import { useState } from 'react';
import { Asterisk } from '../common/Asterisk';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DietaryPreference,
  UserGender,
  UserGoal
} from 'app/store/profileStore';
import { PhysicalActivityLevel } from '@prisma/client';
import { Save } from 'lucide-react';

export const FormEditProfile = ({
  className
}: React.ComponentProps<'form'>) => {
  const { profile, updateProfile } = useProfileStore();
  const [formData, setFormData] = useState({
    height: profile?.height || '',
    weight: profile?.weight || '',
    age: profile?.age || '',
    gender: profile?.gender || 'OTHER',
    dietaryPreference: profile?.dietaryPreference || 'NONE',
    goal: profile?.goal || 'lose_weight',
    physicalActivity: profile?.physicalActivity || 'SEDENTARY'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      gender: formData.gender as UserGender,
      dietaryPreference: formData.dietaryPreference as DietaryPreference,
      physicalActivity: formData.physicalActivity as PhysicalActivityLevel
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'grid items-start gap-4 max-h-[60vh] overflow-y-auto mt-[70px] md:mt-[100px] pb-3 pr-6',
        className
      )}
    >
      {/* Altura */}
      <div className="grid gap-2 mb-5  ">
        <label className="block text-sm font-medium">
          Altura (m) <Asterisk />
        </label>
        <Input
          type="number"
          step="0.01"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          required
        />
      </div>

      {/* Peso */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Peso (kg) <Asterisk />
        </label>
        <Input
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          required
        />
      </div>

      {/* Edad */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Edad <Asterisk />
        </label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>

      {/* Género */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Género <Asterisk />
        </label>
        <Select
          value={formData.gender}
          onValueChange={(value) =>
            setFormData({ ...formData, gender: value as UserGender })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">♂️ Masculino</SelectItem>
            <SelectItem value="FEMALE">♀️ Femenino</SelectItem>
            <SelectItem value="OTHER">❓ Prefiero no definirlo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preferencia Alimenticia */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Preferencia alimenticia <Asterisk />
        </label>
        <Select
          value={formData.dietaryPreference}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              dietaryPreference: value as DietaryPreference
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NONE">🍽️ Sin restricciones</SelectItem>
            <SelectItem value="VEGETARIAN">🥗 Vegetariana</SelectItem>
            <SelectItem value="VEGAN">🌱 Vegana</SelectItem>
            <SelectItem value="GLUTEN_FREE">🌾 Sin gluten</SelectItem>
            <SelectItem value="KETO">🥓 Keto</SelectItem>
            <SelectItem value="PALEO">🍖 Paleo</SelectItem>
            <SelectItem value="HALAL">🌙 Halal</SelectItem>
            <SelectItem value="KOSHER">✡️ Kosher</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Objetivo */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Objetivo <Asterisk />
        </label>
        <Select
          value={formData.goal}
          onValueChange={(value) =>
            setFormData({ ...formData, goal: value as UserGoal })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lose_weight">📉 Bajar de peso</SelectItem>
            <SelectItem value="gain_muscle">💪 Ganar músculo</SelectItem>
            <SelectItem value="maintain_health">
              🩺 Mantener la salud
            </SelectItem>
            <SelectItem value="increase_energy">
              ⚡ Incrementar la energía
            </SelectItem>
            <SelectItem value="improve_digestion">
              🫃 Mejorar la digestión
            </SelectItem>
            <SelectItem value="balanced_diet">⚖️ Dieta balanceada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nivel de actividad física */}
      <div className="grid gap-2 mb-5">
        <label className="block text-sm font-medium">
          Nivel de actividad física <Asterisk />
        </label>
        <Select
          value={formData.physicalActivity}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              physicalActivity: value as PhysicalActivityLevel
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu actividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SEDENTARY">🛋️ Sedentario</SelectItem>
            <SelectItem value="LIGHT">🚶 Ligero</SelectItem>
            <SelectItem value="MODERATE">🏃 Moderado</SelectItem>
            <SelectItem value="ACTIVE">🚴 Muy activo</SelectItem>
            <SelectItem value="VERY_ACTIVE">🏆 Atleta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="flex justify-end mt-[-80px]  fixed w-[89%]">
        <Button className="w-full" type="submit">
          <Save className="size-4" /> Guardar cambios
        </Button>
      </div>
    </form>
  );
};
