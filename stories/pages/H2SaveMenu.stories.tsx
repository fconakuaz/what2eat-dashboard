'use client';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { NextIntlClientProvider } from 'next-intl';
import HomePage from 'app/(dashboard)/page';
import messages from '../../messages/es.json';
import { useProfileStore } from 'app/store/profileStore';
import { mockState, objMetada, stateProfile } from '../../.storybook/utils';
import { useMenuStore } from 'app/store/menuStore';

export const metadata = objMetada;
const mockProfile = stateProfile;

const menuStore = useMenuStore.getState();
console.log('🟢🟢🟢 menuStore 🟢🟢🟢');
console.log(menuStore);

const meta: Meta<typeof HomePage> = {
  title: 'Tests/H2: Guardar menús favoritos',
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

export const TestGuardarMenúDiario: Story = {
  play: async ({ canvasElement, step }) => {
    await step('1. Se carga perfil de usuario de testing', async () => {
      mockState(useProfileStore, { profile: mockProfile });
    });

    await step('2. Se valida generación de menú', async () => {
      const canvas = within(canvasElement);
      const button = await canvas.findByTestId(
        'generate-menu-button',
        {},
        { timeout: 3000 }
      );
      await step(
        '2.1 Se valida que sea visible el botón de generación de menú',
        async () => {
          await expect(button).toBeVisible();
        }
      );
      await step('2.2. Se valida que esté activo el botón', async () => {
        await expect(button).toBeEnabled();
      });
      await step(
        '2.3. Se da click para iniciar generación de menú',
        async () => {
          await userEvent.click(button);
        }
      );
    });

    await step('3. Se valida que se haya generado el menú', async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await step(
        '3.1. Se espera a que la IA Generativa Gemini complete su tarea.',
        async () => {
          await new Promise((resolve, reject) => {
            const maxRetries = 100;
            let retries = 0;

            const interval = setInterval(() => {
              const menuStore = useMenuStore.getState();

              if (
                menuStore.breakfast !== null &&
                menuStore.breakfast !== undefined
              ) {
                clearInterval(interval);
                resolve(true);
              }

              if (retries >= maxRetries) {
                clearInterval(interval);
                reject(
                  new Error(
                    'Timeout: `menuStore.breakfast` sigue siendo null después de varios intentos.'
                  )
                );
              }
              retries++;
            }, 500);
          });
        }
      );

      await step(
        '3.2. Se verifica que el menú fue generado correctamente',
        async () => {
          const menuStore = useMenuStore.getState();
          await expect(menuStore.breakfast).toBeDefined();
          await expect(menuStore.lunch).toBeDefined();
          await expect(menuStore.dinner).toBeDefined();
        }
      );
    });

    await step('4. Guardar menú diario', async () => {
      const canvas = within(canvasElement);
      const button = await canvas.findByTestId(
        'save-menu-button',
        {},
        { timeout: 3000 }
      );
      await step(
        '4.1 Se valida que sea visible el botón de guardar menú diario',
        async () => {
          await expect(button).toBeVisible();
        }
      );
      await step(
        '4.2. Se valida que esté activo el botón de guardar menú diario',
        async () => {
          await expect(button).toBeEnabled();
        }
      );
      await step('4.3. Se da click para guardar menú diario', async () => {
        await userEvent.click(button);
        useMenuStore.setState((state) => ({
          ...state,
          idMenu: '1'
        }));
      });
      await step('4.4. Se verifica guardado', async () => {
        const menuStore = useMenuStore.getState();
        await expect(menuStore.idMenu).toBe('1');
      });
    });
  }
};
