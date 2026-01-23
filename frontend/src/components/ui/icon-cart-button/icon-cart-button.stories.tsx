import type { Meta, StoryObj } from "@storybook/react";
import {IconCartButtonUI} from './index';

const meta: Meta<typeof IconCartButtonUI> = {
  component: IconCartButtonUI,
  title: 'Components/ui/IconCartButtonUI',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    // onClick: { action: 'clicked'},
    // isActive: {control: 'boolean'},
    // iconActiveClass: {control: 'text'},
    // iconClass: {control: 'text'},
    // label: {control: 'text'},
    // sizeIcon: {control: 'number'}
  }
};

export default meta;

type Story = StoryObj<typeof IconCartButtonUI>;

export const IconCartButton: Story = {
  args:{
    onClick:()=>{alert('вы хотите открыть корзину')},
  }
};

export const IconCartButtonWithNumber: Story = {
  args:{
    onClick:()=>{alert('вы хотите открыть корзину')},
    counterQuantity: 5
  }
};

export const IconCartButtonWithOtherNumber: Story = {
  args:{
    onClick:()=>{alert('вы хотите открыть корзину')},
    counterQuantity: 20
  }
};

export const IconCartButtonWithBigNumber: Story = {
  args:{
    onClick:()=>{alert('вы хотите открыть корзину')},
    counterQuantity: 200
  }
};

export const IconCartButtonWithBiggestNumber: Story = {
  args:{
    onClick:()=>{alert('вы хотите открыть корзину')},
    counterQuantity: 2000
  }
};



