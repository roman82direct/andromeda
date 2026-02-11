import type { Meta, StoryObj } from "@storybook/react";
import { SubscribeFormUI } from "./index";

const meta: Meta<typeof SubscribeFormUI> = {
  component: SubscribeFormUI,
  title: "features/subscribe-form/ui/SubscribeFormUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SubscribeFormUI>;

export const subscribeForm: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingBlock: "20px",
          paddingInline: "5px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <SubscribeFormUI {...args} />
      </div>
    );
  },
  args: {
    // email:'moroz@mail.ru'
  },
};
export const subscribeFormWithError: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingBlock: "20px",
          paddingInline: "5px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <SubscribeFormUI {...args} />
      </div>
    );
  },
  args: {
    // email:'moroz@mail.ru'
    isDisabled: true,
    errorMessage: "Введите корректный email",
  },
};
