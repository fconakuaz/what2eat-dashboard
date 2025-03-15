import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'outline',
        'secondary',
        'ghost',
        'link',
        'destructive'
      ],
      description: 'Button style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Button size'
    },
    children: { control: 'text', description: 'Button text' },
    onClick: { action: 'clicked' }
  },
  args: { variant: 'default', size: 'default', children: 'Click me' }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline Button' }
};

export const Large: Story = { args: { size: 'lg', children: 'Large Button' } };

export const Clickable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    await expect(button).toBeVisible();
  }
};
