import type { Meta, StoryObj } from "@storybook/react";
import { InputUI } from "./index";

const meta: Meta<typeof InputUI> = {
  component: InputUI,
  title: "shared/ui/InputUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof InputUI>;

export const primaryInputUI: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          paddingBlock: "20px",
          paddingInline: "10px",
          border: "2px solid black",
          background: "transparent",
        }}
      >
        <InputUI {...args} />
      </div>
    );
  },
  args: {
    variant: "primary",
  },
};
export const secondaryInputUI: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          paddingBlock: "20px",
          paddingInline: "10px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <InputUI {...args} />
      </div>
    );
  },
  args: {
    variant: "secondary",
  },
};

export const InputUIWithErrorMesage: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          paddingBlock: "20px",
          paddingInline: "10px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <InputUI {...args} />
      </div>
    );
  },
  args: {
    variant: "secondary",
    errorMessage: "Введите корректный email",
    value: "Hello,world Hello,world Hello,world Hello,world Hello,world",
  },
};

export const disabledInputUI: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          paddingBlock: "20px",
          paddingInline: "10px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <InputUI {...args} />
      </div>
    );
  },
  args: {
    variant: "secondary",
    isDisabled: true,
    value: "Ввод запрещен",
  },
};
