import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./index";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "widgets/footer/Footer",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const footerUI: Story = {
  args: {},
};
