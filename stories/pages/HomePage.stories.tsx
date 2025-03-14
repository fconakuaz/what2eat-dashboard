'use client';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { NextIntlClientProvider } from 'next-intl';
import HomePage from 'app/(dashboard)/page';
import messages from './../../messages/es.json';
import { useProfileStore } from 'app/store/profileStore';

export const metadata = {
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

const mockState = (store: any, newState: Partial<any>) => {
  store.setState((prev: any) => ({ ...prev, ...newState }));
};

// 🟢 Estado de perfil que queremos usar en el Story
const mockProfile = {
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

const meta: Meta<typeof HomePage> = {
  title: 'What2Eat/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <NextIntlClientProvider locale="es" messages={messages}>
          <Story />
        </NextIntlClientProvider>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia con `loading: false` y se genera un menú
export const GenerateMenu: Story = {
  play: async ({ canvasElement }) => {
    mockState(useProfileStore, { profile: mockProfile });
    const canvas = within(canvasElement);
    const button = await canvas.findByTestId(
      'generate-menu-button',
      {},
      { timeout: 3000 }
    );

    console.log('✅ Botón encontrado en Storybook:', button);

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await userEvent.click(button);
    console.log('🟢 Botón clickeado');
    // const canvas = within(canvasElement);
    // const button = canvas.getByRole('button', { name: /create daily menu/i });
    // await userEvent.click(button);
    // // Esperar que el estado loading pase a `true` y luego a `false`
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // // Verificar que el menú se haya generado
    // const menuStore = useCommonStore.getState();
    // await expect(menuStore.breakfast).toBeDefined();
    // await expect(menuStore.lunch).toBeDefined();
    // await expect(menuStore.dinner).toBeDefined();
  }
};
