import type { Meta, StoryObj } from "@storybook/react";
import { SubscribeForm } from "./index";

const meta: Meta<typeof SubscribeForm> = {
  component: SubscribeForm,
  title: "Components/SubscribeForm",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SubscribeForm>;

export const subscribeForm: Story = {
  render: () => {
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
        <SubscribeForm />
      </div>
    );
  },
  args: {
    // email:'moroz@mail.ru'
  },
};
