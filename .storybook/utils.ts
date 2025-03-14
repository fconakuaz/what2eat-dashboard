export const objMetada = {
  title: 'What2Eat - Eat Smart',
  description:
    'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas.',
  facebook: {
    appId: '1260364538842027'
  },
  openGraph: {
    title: 'What2Eat - Eat Smart',
    description:
      'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas',
    url: 'https://what2eat-dashboard.vercel.app',
    siteName: 'What2Eat',
    images: [
      {
        url: 'https://what2eat-dashboard.vercel.app/dashboard.webp',
        width: 1200,
        height: 630,
        alt: 'Imagen promocional de What2Eat'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tuusuario',
    title: 'What2Eat - Eat Smart',
    description:
      'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas',
    images: ['https://what2eat-dashboard.vercel.app/dashboard.webp']
  }
};

export const stateProfile = {
  id: '2bebd70e-49da-4470-af62-78c92ff55c2c',
  name: 'Francisco Nakú Acosta Zárate',
  image:
    'https://lh3.googleusercontent.com/a/ACg8ocI4Uu9B5fj2Rb4kI1eCxYRi1p2HbaNVTa0oQoGEwSW8tBC7yxsxQg=s96-c',
  email: 'fconakuaz@gmail.com',
  birthDate: new Date('1983-09-25T06:00:00.000Z'),
  gender: 'MALE',
  dietaryPreference: 'NONE',
  country: 'México',
  state: 'Veracruz',
  metricUnit: 'metric',
  height: 1.8,
  weight: 107,
  goal: 'lose_weight',
  physicalActivity: 'LIGHT',
  status: 'ACTIVE',
  role: 'USER',
  createdAt: new Date('2025-03-10T00:16:46.651Z'),
  updatedAt: new Date('2025-03-10T00:18:15.511Z'),
  userActive: true,
  age: 41
};

export const mockState = (store: any, newState: Partial<any>) => {
  store.setState((prev: any) => ({ ...prev, ...newState }));
};
