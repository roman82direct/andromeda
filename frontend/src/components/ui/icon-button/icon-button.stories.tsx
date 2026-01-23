import type { Meta, StoryObj } from "@storybook/react";
import { IconButtonUI } from "./index";

const meta: Meta<typeof IconButtonUI> = {
  component: IconButtonUI,
  title: "Components/ui/IconButtonUI",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
    isActive: { control: "boolean" },
    iconActiveClass: { control: "text" },
    iconClass: { control: "text" },
    label: { control: "text" },
    sizeIcon: { control: "number" },
    isDisabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof IconButtonUI>;

export const IconButtonClose: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по кнопке с иконкой");
    },
    isActive: true,
    iconClass: "close",
    label: "кнопка закрытия",
    sizeIcon: 20,
  },
};

export const IconButtonCloseDisabled: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по кнопке с иконкой");
    },
    isActive: true,
    iconClass: "close",
    label: "кнопка закрытия",
    sizeIcon: 20,
    isDisabled: true,
  },
};

export const IconButtonSearch: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по кнопке иконке");
    },
    isActive: true,
    iconActiveClass: "search",
    label: "поиск",
    sizeIcon: 20,
  },
};

export const IconButtonInfo: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по иконке");
    },
    isActive: true,
    iconActiveClass: "info",
    label: "кнопка закрытия",
    sizeIcon: 20,
  },
};

export const IconButtonLocationPoint: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по иконке");
    },
    isActive: true,
    iconActiveClass: "location",
    label: "иконка локации",
    sizeIcon: 20,
  },
};

export const IconButtonCart: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по иконке");
    },
    isActive: true,
    iconActiveClass: "cart",
    label: "корзина товаров",
    sizeIcon: 20,
  },
};

//  чередование с сердцем

export const IconButtonUnLikedLikedTrue: Story = {
  args: {
    onClick: () => {
      alert("вы кликнули по иконке");
    },
    isActive: false,
    iconActiveClass: "full-heart",
    iconClass: "heart",
    label: "лайкнутая кнопка",
    sizeIcon: 20,
  },
};
