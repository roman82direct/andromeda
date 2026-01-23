import type { Meta, StoryObj } from "@storybook/react";
import {CounterUI} from './index';

const meta: Meta<typeof CounterUI> = {
  component: CounterUI,
  title: 'Components/ui/CounterUI',
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '20px', 
        border: '2px dashed #ddd',
        position: 'relative',
        width: '50px',
        height: '50px',
        display: 'inline-block'
      }}>
        <Story/>
      </div>
    )
  ],
  argTypes: {
     counterQuantity: {
      control: { type: 'number' },
    },
  }
};

export default meta;

type Story = StoryObj<typeof CounterUI>;

export const counterZero: Story = {
  args:{
  }
};

export const counterWithNum: Story = {
  args:{
    counterQuantity: 10
  }
};

export const counterBigNum: Story = {
  
  args:{
    counterQuantity: 100
  }
};

export const counterVeryBigNum: Story = {
  
  args:{
    counterQuantity: 10000
  }
};






