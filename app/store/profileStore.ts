import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Affliction } from './afflictionStore';
import { HealthIndicatorUser } from './healthIndicatorStore';

type UserGender = 'MALE' | 'FEMALE' | 'OTHER';
type DietaryPreference =
  | 'NONE'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'KETO'
  | 'PALEO'
  | 'PESCETARIAN';
type PhysicalActivityLevel =
  | 'SEDENTARY'
  | 'LIGHT'
  | 'MODERATE'
  | 'HIGH'
  | 'ATHLETE';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
type UserRole = 'USER' | 'ADMIN';
export type UserGoal =
  | 'lose_weight' // Bajar de peso
  | 'gain_muscle' // Ganar masa muscular
  | 'maintain_health' // Mantenerme saludable
  | 'increase_energy' // Aumentar energía
  | 'improve_digestion' // Mejorar digestión
  | 'balanced_diet'; // Alimentación equilibrada
export type Unit = 'metric' | 'imperial';

type Profile = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image?: string;
  birthDate?: Date;
  age?: number; // TODO: <-- Agregar función para calcular
  gender?: UserGender | null;
  dietaryPreference?: DietaryPreference;
  goal?: UserGoal;
  metricUnit?: Unit; // 'metric' (m/kg) | 'imperial' (ft/lbs)
  weight?: number; // Peso en kg o lbs
  height?: number; // Altura en metros o pies
  country?: string;
  state?: string;
  physicalActivity?: PhysicalActivityLevel | null;
  status?: UserStatus;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  afflictions?: Affliction[]; // Relación con AfflictionUser
  healthIndicators?: HealthIndicatorUser; // Relación con HealthIndicatorUser
};

type ProfileStore = {
  profile: Profile;
  setProfile: (updatedProfile: Partial<Profile>) => void;
};

export const useProfileStore = create(
  devtools(
    persist<ProfileStore>(
      (set) => ({
        profile: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          physicalActivity: null,
          gender: null
        },
        setProfile: (updatedProfile) =>
          set((state) => {
            let newProfile = { ...state.profile, ...updatedProfile };

            // 📅 Si `birthDate` es válida, calcula la edad
            if (updatedProfile.birthDate) {
              const birthDate = new Date(updatedProfile.birthDate);
              if (!isNaN(birthDate.getTime())) {
                // Verifica si la fecha es válida
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();

                // Ajuste si aún no ha cumplido años en este año
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                  age--;
                }

                newProfile.age = age; // 📌 Agrega `age` al perfil
              }
            }

            return { profile: newProfile };
          })
      }),
      {
        name: 'profile-store', // Name of the key in storage
        storage: createJSONStorage(() => localStorage) // Wrap localStorage
      }
    ),
    { name: 'ProfileStore' }
  )
);

//{
// id: '123123-112-3-123-123',
// firstName: 'Francisco',
// lastName: 'Acosta',
// email: 'fconakua@gmail.com',
// image: 'placeholder-user.jpg',
// birthDate: new Date(1983, 8, 25),
// age: 41,
// metricUnit: 'metric',
// height: 1.78,
// weight: 107,
// goal: 'lose_weight',
// gender: 'MALE',
// dietaryPreference: 'NONE',
// country: 'México',
// state: 'Veracruz',
// physicalActivity: 'MODERATE',
// status: 'ACTIVE',
// role: 'USER',
// createdAt: new Date(2025, 1, 1),
// updatedAt: new Date(2025, 1, 1),

// afflictions: [
//   {
//     id: '1',
//     name: 'Diabetes'
//   },
//   {
//     id: '2',
//     name: 'Colesterol alto'
//   }
// ],

// healthIndicators: {
//   id: '223123-112-3-123-123',
//   userId: '123123-112-3-123-123',
//   weight: 107,
//   height: 178,
//   bmi: 33,
//   bodyType: 'Thick-set',
//   bodyFat: 35,
//   bodyWater: 46,
//   bodyProtein: 15,
//   basalMetabolism: 1987,
//   visceralFat: 15,
//   boneMass: 3.54,
//   createdAt: new Date(2025, 1, 1),
//   updatedAt: new Date(2025, 1, 1)
// }
// },
