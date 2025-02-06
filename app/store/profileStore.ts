import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Affliction } from './afflictionStore';
import { HealthIndicatorUser } from './healthIndicatorStore';

type UserGender = 'MALE' | 'FEMALE' | 'OTHER';
type DietaryPreference = 'NONE' | 'VEGETARIAN' | 'VEGAN' | 'KETO' | 'PALEO';
type PhysicalActivityLevel =
  | 'SEDENTARY'
  | 'LIGHT'
  | 'MODERATE'
  | 'HIGH'
  | 'ATHLETE';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
type UserRole = 'USER' | 'ADMIN';

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  birthDate: Date;
  age: number; // TODO: <-- Agregar función para calcular
  gender: UserGender;
  dietaryPreference: DietaryPreference;
  country: string;
  state: string;
  physicalActivity: PhysicalActivityLevel;
  status: UserStatus;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  afflictions: Affliction[]; // Relación con AfflictionUser
  healthIndicators: HealthIndicatorUser; // Relación con HealthIndicatorUser
};

type ProfileStore = {
  profile: Profile;
  setProfile: (updatedProfile: Partial<Profile>) => void;
};

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      profile: {
        id: '123123-112-3-123-123',
        firstName: 'Francisco',
        lastName: 'Acosta',
        email: 'fconakua@gmail.com',
        image: 'placeholder-user.jpg',
        birthDate: new Date(1983, 8, 25),
        age: 41,
        gender: 'MALE',
        dietaryPreference: 'NONE',
        country: 'México',
        state: 'Veracruz',
        physicalActivity: 'MODERATE',
        status: 'ACTIVE',
        role: 'USER',
        createdAt: new Date(2025, 1, 1),
        updatedAt: new Date(2025, 1, 1),

        afflictions: [
          {
            id: '1',
            name: 'Diabetes'
          },
          {
            id: '2',
            name: 'Colesterol alto'
          }
        ],

        healthIndicators: {
          id: '223123-112-3-123-123',
          userId: '123123-112-3-123-123',
          weight: 107,
          height: 178,
          bmi: 33,
          bodyType: 'Thick-set',
          bodyFat: 35,
          bodyWater: 46,
          bodyProtein: 15,
          basalMetabolism: 1987,
          visceralFat: 15,
          boneMass: 3.54,
          createdAt: new Date(2025, 1, 1),
          updatedAt: new Date(2025, 1, 1)
        }
      },
      setProfile: (updatedProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...updatedProfile }
        }))
    }),
    {
      name: 'profile-store', // Name of the key in storage
      storage: createJSONStorage(() => localStorage) // Wrap localStorage
    }
  )
);
