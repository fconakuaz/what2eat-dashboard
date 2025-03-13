import { useActivityStore } from 'app/store/activityStore';
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

export const ActivityForm = ({ className }: React.ComponentProps<'form'>) => {
  const [formData, setFormData] = useState({
    activityId: '',
    date: new Date().toISOString().split('T')[0], //Formato YYYY-MM-DD
    steps: '',
    caloriesBurned: '',
    distanceMeters: '',
    activeMinutes: ''
  });

  const { activityTypes, addActivity } = useActivityStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newActivity = {
      startDateTime: formData.date,
      activityId: formData.activityId,
      steps: formData.steps ? parseInt(formData.steps) : undefined,
      caloriesBurned: formData.caloriesBurned
        ? parseFloat(formData.caloriesBurned)
        : undefined,
      distanceMeters: formData.distanceMeters
        ? parseFloat(formData.distanceMeters)
        : undefined,
      activeMinutes: formData.activeMinutes
        ? parseInt(formData.activeMinutes)
        : undefined
    };

    await addActivity(newActivity);

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
    <form
      onSubmit={handleSubmit}
      className={cn(
        'grid items-start gap-4 max-h-[60vh] overflow-y-auto',
        className
      )}
    >
      {/* Select de Actividades */}
      <div className="grid gap-2 ">
        <label className="block text-sm font-medium">
          Tipo de Actividad <Asterisk />
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
      <div className="grid gap-2 w-10">
        <label className="block text-sm font-medium">
          Fecha <span className="text-red-600">*</span>
        </label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      {/* Otros Campos */}
      {['steps', 'caloriesBurned', 'distanceMeters', 'activeMinutes'].map(
        (key) => (
          <div key={key} className="grid gap-2">
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

      <Button type="submit" className="mt-4">
        Guardar Registro
      </Button>
    </form>
  );
};
