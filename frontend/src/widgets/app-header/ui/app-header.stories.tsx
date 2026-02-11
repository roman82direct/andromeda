import type { Meta, StoryObj } from "@storybook/react";
import { AppHeaderUI } from "./app-header";
import { MemoryRouter } from "react-router-dom";
import type { TIconType } from "@/shared/types/ui/icon";

const meta: Meta<typeof AppHeaderUI> = {
  component: AppHeaderUI,
  title: "widgets/app-header/ui/AppHeaderUI",
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
  { typeIcon: "come-in", typeEvent: { trigger: "route", path: "" } },
  {
    typeIcon: "full-heart",
    counterNum: 5,
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "cart",
    counterNum: 9,
    typeEvent: { trigger: "route", path: "" },
  },
];

export const appHeaderUI: Story = {
  args: {
    navIcons,
  },
};

export const appHeaderUIWithBtn: Story = {
  args: {
    navIcons: [
      ...navIcons,
      {
        typeIcon: "clock",
        typeEvent: {
          trigger: "action-on-page",
          callback: () => {
            alert("действие на странице");
          },
        },
      },
    ],
  },
};
