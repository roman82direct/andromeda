import type { Meta, StoryObj } from "@storybook/react";
import {LogoUI} from './logo';

const meta: Meta<typeof LogoUI> = {
  component: LogoUI,
  title: 'Components/ui/LogoUI',
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof LogoUI>;

export const DefaultLogo: Story = {
  args:{}
};