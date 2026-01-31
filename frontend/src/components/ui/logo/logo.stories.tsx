import type { Meta, StoryObj } from "@storybook/react";
import { LogoUI } from "./logo";

const meta: Meta<typeof LogoUI> = {
  component: LogoUI,
  title: "Components/ui/LogoUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof LogoUI>;

export const LogoLight: Story = {
  args: {
    color: "light-background",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "200px",
          aspectRatio: "1",
          background: "orange",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const LogoDark: Story = {
  args: {
    color: "dark-background",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "200px",
          aspectRatio: "1",
          background: "#15242a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
