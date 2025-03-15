import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: '🍎 What2Eat',
    brandUrl: 'https://what2eat-dashboard.vercel.app'
    // brandImage: '/apple-touch-icon.png'
  })
});
