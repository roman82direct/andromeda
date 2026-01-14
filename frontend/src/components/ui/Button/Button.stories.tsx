import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Example/Button",
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => <button>Button</button>,
};
