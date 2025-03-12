import * as XLSX from 'xlsx';
import { Flame, Footprints, Hourglass, Ruler } from 'lucide-react';

// Función para exportar a Excel
export const exportToExcel = (activities: any) => {
  const worksheet = XLSX.utils.json_to_sheet(
    activities?.all.map((activity: any) => ({
      Fecha: new Date(activity.startDateTime).toLocaleDateString('es-ES'),
      Actividad: activity.activity.name,
      Pasos: activity.steps ?? 0,
      'Calorías Quemadas': activity.caloriesBurned ?? 0,
      'Distancia (m)': activity.distanceMeters ?? 0,
      'Minutos Activos': activity.activeMinutes ?? 0
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial de Actividad');
  XLSX.writeFile(workbook, 'Historial_Actividad.xlsx');
};

export const arrChartsActivities = [
  {
    title: (
      <span className="flex flex-row">
        <Footprints color="#2662d9" className={`size-6 mr-2`} /> Pasos diarios
      </span>
    ),
    key: 'steps'
  },
  {
    title: (
      <span className="flex flex-row">
        <Flame color="#2662d9" className={`size-6 mr-1`} /> Calorías quemadas
      </span>
    ),
    key: 'caloriesBurned'
  },
  {
    title: (
      <span className="flex flex-row">
        <Ruler color="#2662d9" className={`size-6 mr-1`} /> Distancia recorrida
        (m)
      </span>
    ),
    key: 'distanceMeters'
  },
  {
    title: (
      <span className="flex flex-row">
        <Hourglass color="#2662d9" className={`size-6 mr-1`} /> Minutos activos
      </span>
    ),
    key: 'activeMinutes'
  }
];
