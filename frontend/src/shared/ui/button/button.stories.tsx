import type { Meta, StoryObj } from "@storybook/react";
import { ButtonUI } from "./button";
import { IconUI } from "../icon";

const meta: Meta<typeof ButtonUI> = {
  component: ButtonUI,
  title: "shared/ui/ButtonUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isDisabled: { control: "boolean" },
    fullSize: { control: "boolean" },
    variant: { control: "text" },
    color: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonUI>;

export const primaryButtonUI: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          border: "2px solid black",
        }}
      >
        <ButtonUI {...args} />
      </div>
    );
  },
  args: {
    children: "Button",
    color: "primary",
    variant: "filled",
  },
};

export const secondaryButtonUI: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          border: "2px solid black",
        }}
      >
        <ButtonUI {...args} />
      </div>
    );
  },
  args: {
    children: "Button",
    color: "secondary",
    variant: "outlined",
  },
};

export const forFormSubscribeButton: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          border: "2px solid black",
          background: "#2F4D5A",
        }}
      >
        <ButtonUI {...args} />
      </div>
    );
  },
  args: {
    children: "Подписаться",
    color: "dark",
    variant: "outlined",
  },
};

export const darkButtonFullfiled: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          border: "2px solid black",
          background: "#2F4D5A",
        }}
      >
        <ButtonUI {...args} />
      </div>
    );
  },
  args: {
    children: "Подписаться",
    color: "dark",
    variant: "filled",
  },
};

//  необходимо переделать компонент iconUi : добавить возмонжость цвета и
//  и реакцию на псевдокласс родителя что типа currentColor
export const ButtonUIWithIconCart: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          padding: "20px",
          border: "2px solid black",
        }}
      >
        <ButtonUI {...args} />
      </div>
    );
  },
  args: {
    children: (
      <>
        <IconUI
          colorIcon={"primary"}
          sizeIcon={15}
          inheritColor
          iconClass="cart"
        />
        <span>Купить</span>
      </>
    ),
    color: "secondary",
    variant: "outlined",
  },
};
