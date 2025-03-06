import { create } from 'zustand';

interface HealthState {
  dates: string[];
  weight: number[];
  bmi: number[];
  bodyFat: number[];
  bodyWater: number[];
  bodyProtein: number[];
  basalMetabolism: number[];
  visceralFat: number[];
  boneMass: number[];
  addRecord: (record: {
    date: string;
    weight?: number;
    bmi?: number;
    bodyFat?: number;
    bodyWater?: number;
    bodyProtein?: number;
    basalMetabolism?: number;
    visceralFat?: number;
    boneMass?: number;
  }) => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  dates: ['01/03/2024', '08/03/2024', '15/03/2024'],
  weight: [80, 79.5, 79],
  bmi: [25.2, 24.9, 24.7],
  bodyFat: [20.5, 20.1, 19.8],
  bodyWater: [55.2, 55.5, 55.8],
  bodyProtein: [18.1, 18.2, 18.3],
  basalMetabolism: [1600, 1595, 1590],
  visceralFat: [10, 9.8, 9.7],
  boneMass: [3.5, 3.4, 3.4],

  addRecord: (record) =>
    set((state) => ({
      dates: [...state.dates, record.date],
      weight: [
        ...state.weight,
        record.weight ?? state.weight[state.weight.length - 1]
      ],
      bmi: [...state.bmi, record.bmi ?? state.bmi[state.bmi.length - 1]],
      bodyFat: [
        ...state.bodyFat,
        record.bodyFat ?? state.bodyFat[state.bodyFat.length - 1]
      ],
      bodyWater: [
        ...state.bodyWater,
        record.bodyWater ?? state.bodyWater[state.bodyWater.length - 1]
      ],
      bodyProtein: [
        ...state.bodyProtein,
        record.bodyProtein ?? state.bodyProtein[state.bodyProtein.length - 1]
      ],
      basalMetabolism: [
        ...state.basalMetabolism,
        record.basalMetabolism ??
          state.basalMetabolism[state.basalMetabolism.length - 1]
      ],
      visceralFat: [
        ...state.visceralFat,
        record.visceralFat ?? state.visceralFat[state.visceralFat.length - 1]
      ],
      boneMass: [
        ...state.boneMass,
        record.boneMass ?? state.boneMass[state.boneMass.length - 1]
      ]
    }))
}));
