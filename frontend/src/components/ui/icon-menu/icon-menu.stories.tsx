import type { Meta, StoryObj } from "@storybook/react";
import { IconMenuUI } from "./icon-menu";
import { MemoryRouter } from "react-router-dom";
import type { TIconType } from "@/shared/types/ui/icon";

const meta: Meta<typeof IconMenuUI> = {
  component: IconMenuUI,
  title: "Components/ui/IconMenuUI",
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

type Story = StoryObj<typeof IconMenuUI>;

const  navIconsForHeader: TIconType[] = [
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

const  navIconsForFooter: TIconType[] = [
  {
    typeIcon: "visa",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "mastercard",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "youtube",
    typeEvent: { trigger: "route", path: "" },
  },
];

export const iconsMenuForHeader: Story = {
  args: {
    navIcons: navIconsForHeader,
  },
};

export const iconsMenuForFooter: Story = {
  args: {
    navIcons: navIconsForFooter,
  },
};


