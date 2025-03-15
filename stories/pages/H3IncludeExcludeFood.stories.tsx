'use client';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { NextIntlClientProvider } from 'next-intl';
import HomePage from 'app/(dashboard)/page';
import messages from '../../messages/es.json';
import { useProfileStore } from 'app/store/profileStore';
import {
  mockState,
  objMetada,
  stateExcludeFood,
  stateFood,
  stateIncludeFood,
  stateProfile
} from '../../.storybook/utils';
import { useIncludeFoodStore } from '@/app/store/includeFoodStore';
import { useExcludeFoodStore } from '@/app/store/excludeFoodStore';
import { useFoodStore } from '@/app/store/foodStore';

export const metadata = objMetada;

const foodsStore = useFoodStore.getState();

console.log('🟢🟢🟢 foodsStore 🟢🟢🟢');
console.log(foodsStore);

const meta: Meta<typeof HomePage> = {
  title: 'Tests/H3: Incluir y excluir alimentos.',
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

export const TestExcluirOIncluirAlimentos: Story = {
  play: async ({ canvasElement, step }) => {
    mockState(useProfileStore, { profile: stateProfile });
    mockState(useIncludeFoodStore, { ingredientsToInclude: stateIncludeFood });
    mockState(useExcludeFoodStore, { ingredientsToExclude: stateExcludeFood });
    mockState(useFoodStore, { foods: stateExcludeFood });
    await step('1. Se carga perfil de usuario de testing', async () => {});
    const canvas = within(canvasElement);
    // const button = await canvas.findByTestId(
    //   'save-menu-button',
    //   {},
    //   { timeout: 3000 }
    // );

    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Incluir alimentos' }).click();
    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Agregar' }).click();
    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Guardar Selección' }).click();
    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Excluir alimentos' }).click();
    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Agregar' }).click();
    // await page.locator('iframe[title="storybook-preview-iframe"]').contentFrame().getByRole('button', { name: 'Guardar Selección' }).click();
  }
};
