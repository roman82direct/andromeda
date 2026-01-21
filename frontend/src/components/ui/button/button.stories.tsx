import type { Meta, StoryObj } from "@storybook/react";
import {ButtonUI} from './button';

const meta: Meta<typeof ButtonUI> = {
  component: ButtonUI,
  title: 'Components/ui/ButtonUI',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isDisabled: {control: 'boolean'},
    fullSize: {control: 'boolean'}
  }
};

export default meta;

type Story = StoryObj<typeof ButtonUI>;

export const primaryButtonUI: Story = {
  render: (args) => {
    return (<div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid black'}}>
      <ButtonUI {...args} />
    </div>)
  },
  args:{
    children: 'Button',
    color: 'primary'
  }
};

export const secondaryButtonUI: Story = {
  render: (args) => {
    return (
    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid black'}}>
      <ButtonUI {...args} />
    </div>
    )
  },
  args:{
    children: 'Button',
    color: 'secondary'
  }
};