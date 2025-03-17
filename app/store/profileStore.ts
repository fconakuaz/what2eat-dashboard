import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Affliction } from './afflictionStore';
import { HealthIndicatorUser } from './healthIndicatorStore';
import axios from 'axios';

export type UserGender = 'MALE' | 'FEMALE' | 'OTHER';
export type DietaryPreference =
  | 'NONE'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'GLUTEN_FREE'
  | 'KETO'
  | 'PALEO'
  | 'HALAL'
  | 'KOSHER';
export type PhysicalActivityLevel =
  | 'SEDENTARY'
  | 'LIGHT'
  | 'MODERATE'
  | 'ACTIVE'
  | 'VERY_ACTIVE';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
type UserRole = 'USER' | 'ADMIN';
export type UserGoal =
  | 'lose_weight'
  | 'gain_muscle'
  | 'maintain_health'
  | 'increase_energy'
  | 'improve_digestion'
  | 'balanced_diet';
export type Unit = 'metric' | 'imperial';

type Profile = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  birthDate?: Date;
  age?: number;
  gender?: UserGender | null;
  dietaryPreference?: DietaryPreference;
  goal?: UserGoal;
  metricUnit?: Unit; // 'metric' (m/kg) | 'imperial' (ft/lbs)
  weight?: number; // Weight in kg or lbs
  height?: number; // Height in meters or foots
  country?: string;
  state?: string;
  physicalActivity?: PhysicalActivityLevel | null;
  status?: UserStatus;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  afflictions?: Affliction[]; // Realation with AfflictionUser
  healthIndicators?: HealthIndicatorUser; // Realation with HealthIndicatorUser
  userActive: boolean;
};

type ProfileStore = {
  profile: Profile;
  setProfile: (updatedProfile: Partial<Profile>) => void;
  updateProfile: (updatedProfile: Partial<Profile>) => void;
  getUserProfile: (router: any) => Promise<void>;
  saveProfileToDB: () => Promise<void>;
};

export const calculateAge = (birthDate: string | Date): number => {
  if (!birthDate) return 0; // Retorna 0 si no hay fecha

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 0; // Manejo de error en caso de fecha inválida

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Si aún no ha cumplido años en este año, restar 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const useProfileStore = create(
  // devtools(
  persist<ProfileStore>(
    (set, get) => ({
      profile: {
        physicalActivity: null,
        gender: null,
        userActive: false
      },
      setProfile: (updatedProfile) =>
        set((state) => {
          let newProfile = { ...state.profile, ...updatedProfile };

          // Calculate Age
          if (updatedProfile.birthDate) {
            const birthDate = new Date(updatedProfile.birthDate);
            if (!isNaN(birthDate.getTime())) {
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
              ) {
                age--;
              }
              newProfile.age = age;
            }
          }
          return { profile: newProfile };
        }),
      saveProfileToDB: async () => {
        const { profile } = get();
        try {
          const { userActive, ...profileToUpdate } = profile;
          await axios.post('/api/profile', profileToUpdate);
        } catch (error) {
          console.error('❌ Error al guardar el perfil:', error);
        }
      },

      updateProfile: async (updatedProfile) => {
        const { profile } = get();
        try {
          // Fusiona el estado actual con los nuevos datos
          const newProfile = { ...profile, ...updatedProfile };

          // Enviar actualización a la base de datos
          const response = await axios.post('/api/profile/update', newProfile);

          if (response.status === 200) {
            set({ profile: newProfile });
          } else {
            console.error('Error al actualizar perfil:', response.data);
          }
        } catch (error) {
          console.error('❌ Error al actualizar el perfil:', error);
        }
      },

      getUserProfile: async (router) => {
        try {
          const { data } = await axios.get('/api/profile');
          const age = calculateAge(data.birthDate);
          set({ profile: { ...data, userActive: true, age } });
          if (!data.gender) {
            router.push('/wizard');
          }
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        }
      }
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
  //, { name: 'ProfileStore' }
  // )
);
