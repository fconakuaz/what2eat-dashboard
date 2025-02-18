import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function DatePickerDropdown({
  value,
  onChange
}: {
  value: string;
  onChange: (date: string) => void;
}) {
  const currentDate = value ? new Date(value) : new Date();

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  // 🔹 Lista de días (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 🔹 Lista de meses (1-12)
  const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  // 🔹 Lista de años (1900 - Año actual)
  const startYear = 1925;
  const endYear = new Date().getFullYear();
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  // 🔄 Actualiza la fecha en formato ISO al cambiar algún valor
  useEffect(() => {
    const newDate = new Date(year, month - 1, day);
    onChange(newDate.toISOString()); // Guarda en formato ISO
  }, [day, month, year, onChange]);

  return (
    <div className="flex gap-2">
      {/* 📅 Selector de Día */}
      <Select
        value={day === 0 ? undefined : String(day)}
        onValueChange={(value) => setDay(Number(value))}
      >
        <SelectTrigger className="w-[70px] text-sm">
          <SelectValue placeholder="Día" />
        </SelectTrigger>
        <SelectContent>
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 📆 Selector de Mes */}
      <Select
        value={month === 0 ? undefined : String(month)}
        onValueChange={(value) => setMonth(Number(value))}
      >
        <SelectTrigger className="w-[118px] text-sm">
          <SelectValue placeholder="Mes" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={String(m.value)}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 📜 Selector de Año */}
      <Select
        value={year === 0 ? undefined : String(year)}
        onValueChange={(value) => setYear(Number(value))}
      >
        <SelectTrigger className="w-[85px] text-sm">
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
