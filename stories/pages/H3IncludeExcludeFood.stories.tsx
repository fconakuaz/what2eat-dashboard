'use client';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, within } from '@storybook/test';
import { NextIntlClientProvider } from 'next-intl';
import HomePage from 'app/(dashboard)/page';
import messages from '../../messages/es.json';
import { useProfileStore } from 'app/store/profileStore';
import {
  mockState,
  objMetada,
  stateExcludeFood,
  stateIncludeFood,
  stateProfile
} from '../../.storybook/utils';
import { useIncludeFoodStore } from '@/app/store/includeFoodStore';
import { useExcludeFoodStore } from '@/app/store/excludeFoodStore';
import { useFoodStore } from '@/app/store/foodStore';

export const metadata = objMetada;

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

    await step('2. Se abre el modal para incluir alimentos', async () => {
      const includeButton = await canvas.findByRole('button', {
        name: 'Incluir alimentos'
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await userEvent.click(includeButton);
    });

    await step('3. Se agrega un alimento a la lista de inclusión', async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const addButton = await canvas.findByTestId(
        'button-add-list-food',
        {},
        { timeout: 3000 }
      );
      await userEvent.click(addButton);
    });

    await step('4. Se seleccionan alimentos a incluir', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const cherryButton = await screen.findByText('Cereza');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const higoButton = await screen.findByText('Higo');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const albaricoqueButton = await screen.findByText('Albaricoque');
      await userEvent.click(cherryButton);
      await userEvent.click(higoButton);
      await userEvent.click(albaricoqueButton);
    });

    await step('5. Se guarda la selección de alimentos incluidos', async () => {
      const saveIncludeButton = await screen.findByTestId(
        'button-save-list-food',
        {},
        { timeout: 2000 }
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await userEvent.click(saveIncludeButton);
    });

    await step('6. Se abre el modal para excluir alimentos', async () => {
      const excludeButton = await canvas.findByRole('button', {
        name: 'Excluir alimentos'
      });
      await userEvent.click(excludeButton);
    });

    await step('7. Se agrega un alimento a la lista de exclusión', async () => {
      const addExcludeButton = await canvas.findByTestId(
        'button-add-list-food',
        {},
        { timeout: 3000 }
      );
      await userEvent.click(addExcludeButton);
    });

    await step('8. Se seleccionan alimentos a incluir', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const pineappleButton = await screen.findByText('Piña');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const pearButton = await screen.findByText('Pera');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const nectarineButton = await screen.findByText('Nectarina');
      await userEvent.click(pineappleButton);
      await userEvent.click(pearButton);
      await userEvent.click(nectarineButton);
    });

    await step('9. Se guarda la selección de alimentos excluidos', async () => {
      const saveExcludeButton = await screen.findByTestId(
        'button-save-list-food',
        {},
        { timeout: 3000 }
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await userEvent.click(saveExcludeButton);
    });

    await step(
      '10. Se verifica que los alimentos se han guardado correctamente',
      async () => {
        const { ingredientsToInclude } = await useIncludeFoodStore.getState();
        const lenghtIngredientsToInclude = await ingredientsToInclude.length;
        await expect(lenghtIngredientsToInclude).toBeGreaterThan(0);
      }
    );
  }
};
