import type { Meta, StoryObj } from "@storybook/react";
import { AppHeaderUI } from "./app-header";
import { MemoryRouter } from "react-router-dom";
import type { TIconType } from "./app-header";

const meta: Meta<typeof AppHeaderUI> = {
  component: AppHeaderUI,
  title: "Components/ui/AppHeaderUI",
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

type Story = StoryObj<typeof AppHeaderUI>;

const navIcons: TIconType[] = [
  //  если мы вошли - то смена иконки 'come-in' допустим на profile
  { typeIcon: "come-in", path: "/", typeEvent: "route" },
  { typeIcon: "full-heart", path: "/", counterNum: 5, typeEvent: "route" },
  { typeIcon: "cart", path: "/", counterNum: 9, typeEvent: "route" },
  { typeIcon: "clock", typeEvent: "action-on-page" },
];
export const appHeaderUI: Story = {
  args: {
    navIcons,
  },
};
