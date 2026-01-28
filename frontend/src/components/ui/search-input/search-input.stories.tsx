import type { Meta, StoryObj } from "@storybook/react";
import { SearchInputUI } from "./search-input";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof SearchInputUI> = {
  component: SearchInputUI,
  title: "Components/ui/SearchInputUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: { control: "text" },
    onChange: { action: "changed" },
    onClear: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SearchInputUI>;

export const searchInputUI: Story = {
  args: {
    placeholder: "Поиск",
    value: "",
  },
};

export const withText: Story = {
  args: {
    placeholder: "Поиск",
    value: "Text",
  },
};

//  наличие выпад списка

export const withPopularQueries: Story = {
  args: {
    placeholder: "Поиск",
    value: "Ткани",
    listsQueries: {
      popular: [
        { name: "ткани", id: "1", path: "" },
        { name: "шторы", id: "2", path: "" },
        { name: "распродажа", id: "3", path: "" },
      ],
    },
  },
};

export const withPopularandHistoryQueries: Story = {
  args: {
    placeholder: "Поиск",
    value: "Заполнено",
    listsQueries: {
      popular: [
        { name: "ткани", id: "1", path: "" },
        { name: "шторы", id: "2", path: "" },
        { name: "распродажа", id: "3", path: "" },
      ],
      history: [
        { name: "ткани", id: "1", path: "" },
        { name: "шторы", id: "2", path: "" },
        { name: "распродажа", id: "3", path: "" },
      ],
    },
  },
};
