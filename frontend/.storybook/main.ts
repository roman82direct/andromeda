import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [], // пусто или только SB10-совместимые аддоны
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;