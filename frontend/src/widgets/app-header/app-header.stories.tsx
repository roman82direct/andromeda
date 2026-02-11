import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader } from "./app-header";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: "widgets/app-header/AppHeader",
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

type Story = StoryObj<typeof AppHeader>;

export const appHeader: Story = {
  // render: (args) => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         width: "400px",
  //         padding: "20px",
  //         border: "2px solid black",
  //       }}
  //     >
  //       <AppHeaderUI {...args} />
  //     </div>
  //   );
  // },
  args: {},
};
