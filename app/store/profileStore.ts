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
  | 'lose_weight'
  | 'gain_muscle'
  | 'maintain_health'
  | 'increase_energy'
  | 'improve_digestion'
  | 'balanced_diet';
export type Unit = 'metric' | 'imperial';

type Profile = {
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
          physicalActivity: null,
          gender: null
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
          })
      }),
      {
        name: 'profile-store',
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'ProfileStore' }
  )
);
