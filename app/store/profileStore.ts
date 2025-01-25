import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const conditions = [
  'Diabetes',
  'Colesterol alto',
  'Hipertensión',
  'Obesidad',
  'Insuficiencia renal crónica',
  'Hipotiroidismo',
  'Hipertiroidismo',
  'Artritis reumatoide',
  'Osteoporosis',
  'Síndrome metabólico',
  'Anemia',
  'Gota',
  'Enfermedad del hígado graso no alcohólico (NAFLD)',
  'Apnea del sueño',
  'Intolerancia a la lactosa',
  'Enfermedad celíaca',
  'Triglicéridos elevados',
  'Enfermedad coronaria',
  'Arritmias cardíacas',
  'Insuficiencia cardíaca congestiva',
  'Asma',
  'EPOC (Enfermedad pulmonar obstructiva crónica)',
  'Depresión',
  'Ansiedad',
  'Enfermedad de Crohn',
  'Colitis ulcerosa',
  'Síndrome del intestino irritable (SII)',
  'Hipoglucemia',
  'Migrañas crónicas',
  'Dermatitis atópica',
  'Psoriasis'
];

type Profile = {
  firstName: string;
  lastName: string;
  image: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  country: string;
  state: string;
  physicalActivity: number;
  conditions: string[];
};

type ProfileStore = {
  profile: Profile;
  setProfile: (updatedProfile: Partial<Profile>) => void;
};

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      profile: {
        firstName: 'Francisco',
        lastName: 'Acosta',
        image: 'placeholder-user.jpg',
        height: 178,
        weight: 107,
        age: 41,
        gender: 'M',
        country: 'México',
        state: 'Veracruz',
        physicalActivity: 2,
        conditions: ['Diabetes', 'Colesterol alto', 'Hipertensión']
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
