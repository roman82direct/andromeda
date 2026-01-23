import type { Meta, StoryObj } from "@storybook/react";
import {IconUI} from './index';

const meta: Meta<typeof IconUI> = {
  component: IconUI,
  title: 'Components/ui/IconUI',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    iconClass: {control: 'text'},
    sizeIcon: {control: 'number'},
    turnIcon: {control: 'number'},
    interactiveMode: {control: 'boolean'},
    isDisabledState: {control: 'boolean'}
  }
};

export default meta;

type Story = StoryObj<typeof IconUI>;

export const IconSearch: Story = {
  args:{
    iconClass: 'search',
    sizeIcon: 20
  }
};

export const IconNetwork: Story = {
  args:{
    iconClass: 'global',
     sizeIcon: 20
  }
};

export const IconInteractiveForBtn: Story = {
  args:{
    iconClass: 'close',
     sizeIcon: 30,
     interactiveMode: true
  }
};

export const IconInteractiveDisabledForBtn: Story = {
  args:{
    iconClass: 'youtube',
     sizeIcon: 30,
     interactiveMode: true,
     isDisabledState: true
  }
};

