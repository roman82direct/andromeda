import type { Meta, StoryObj } from "@storybook/react";
import { FooterUI } from "./index";
import { MemoryRouter } from "react-router-dom";
import { navIconsForFooter } from "../data/footer-icons";
import { footerLinks } from "../data/footer-links";

const meta: Meta<typeof FooterUI> = {
  component: FooterUI,
  title: "widgets/footer/ui/FooterUI",
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

type Story = StoryObj<typeof FooterUI>;


export const footerUI: Story = {
  args: {
    socialLinksIcons: navIconsForFooter,
    columnsListsLinks: footerLinks
  },
};
