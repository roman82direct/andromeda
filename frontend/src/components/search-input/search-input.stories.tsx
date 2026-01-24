import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./search-input";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: "Components/SearchInput",
  parameters: {
    layout: "centered",
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

type Story = StoryObj<typeof SearchInput>;

export const searchStory: Story = {
  args: {},
};
