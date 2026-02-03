import type { Meta, StoryObj } from "@storybook/react";
import { IconUI } from "./index";

const meta: Meta<typeof IconUI> = {
  component: IconUI,
  title: "Components/ui/IconUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    iconClass: { control: "text" },
    sizeIcon: { control: "number" },
    turnIcon: { control: "number" },
    interactiveMode: { control: "boolean" },
    isDisabledState: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof IconUI>;

export const IconSearch: Story = {
  args: {
    iconClass: "search",
    sizeIcon: 20,
    colorIcon: "primary",
  },
};

export const IconLikes: Story = {
  args: {
    iconClass: "heart",
    sizeIcon: 20,
    counterQuantity: 5,
    colorIcon: "primary",
  },
};

export const IconCart: Story = {
  args: {
    iconClass: "cart",
    sizeIcon: 20,
    counterQuantity: 7,
    interactiveMode: true,
    colorIcon: "primary",
  },
};

export const IconCartBigNumber: Story = {
  args: {
    iconClass: "cart",
    sizeIcon: 20,
    counterQuantity: 50,
    interactiveMode: true,
    colorIcon: "primary",
  },
};

export const IconCartBiggestNumber: Story = {
  args: {
    iconClass: "cart",
    sizeIcon: 20,
    counterQuantity: 200,
    interactiveMode: true,
    colorIcon: "primary",
  },
};

export const IconNetwork: Story = {
  args: {
    iconClass: "global",
    sizeIcon: 20,
    interactiveMode: true,
    colorIcon: "primary",
  },
};

export const IconInteractiveForBtn: Story = {
  args: {
    iconClass: "close",
    sizeIcon: 30,
    interactiveMode: true,
    colorIcon: "primary",
  },
};

export const IconInteractiveDisabledForBtn: Story = {
  args: {
    iconClass: "youtube",
    sizeIcon: 30,
    interactiveMode: true,
    isDisabledState: true,
    colorIcon: "primary",
  },
};
