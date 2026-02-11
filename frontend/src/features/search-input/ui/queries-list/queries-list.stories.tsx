import type { Meta, StoryObj } from "@storybook/react";
import { ListQueriesUI } from "./queries-list";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof ListQueriesUI> = {
  component: ListQueriesUI,
  title: "features/search-input/ui/ListQueriesUI",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ListQueriesUI>;

export const popularQueries: Story = {
  args: {
    title: "Популярные запросы",
    listQueries: [
      { name: "ткани", id: "1", path: "" },
      { name: "шторы", id: "2", path: "" },
      { name: "распродажа", id: "3", path: "" },
    ],
    isShow: true,
    onDelete: () => alert("Вы удалили запрос"),
  },
};

export const historyQueries: Story = {
  args: {
    title: "История",
    listQueries: [
      { name: "ткани", id: "1", path: "" },
      { name: "шторы", id: "2", path: "" },
      { name: "распродажа", id: "3", path: "" },
    ],
    isShow: true,
    onDelete: () => alert("Вы удалили запрос"),
  },
};

export const WithBtnClearHistory: Story = {
  args: {
    title: "История",
    listQueries: [
      { name: "ткани", id: "1", path: "" },
      { name: "шторы", id: "2", path: "" },
      { name: "распродажа", id: "3", path: "" },
    ],
    isShow: true,
    onDelete: () => alert("Вы удалили запрос"),
    onClearList: () => alert("Вы очистили историю"),
  },
};

export const WithManyTexts: Story = {
  args: {
    title: "История",
    listQueries: [
      {
        name: "ткани ткани ткани ткани ткани ткани ткани ткани ткани",
        id: "1",
        path: "",
      },
      {
        name: "шторы шторы шторы шторы шторы шторы шторы шторы шторы шторы",
        id: "2",
        path: "",
      },
      {
        name: "распродажа распродажа распродажа распродажа распродажа распродажа распродажаs",
        id: "3",
        path: "",
      },
    ],
    isShow: true,
    onDelete: () => alert("Вы удалили запрос"),
    onClearList: () => alert("Вы очистили историю"),
  },
};
