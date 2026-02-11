import type { Meta, StoryObj } from "@storybook/react";
import { IconButtonUI } from "./index";

const meta: Meta<typeof IconButtonUI> = {
  component: IconButtonUI,
  title: "shared/ui/IconButtonUI",
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
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "300px",
          paddingBlock: "20px",
          paddingInline: "5px",
          border: "2px solid black",
          background: "#15242a",
        }}
      >
        <IconButtonUI {...args} />
      </div>
    );
  },
  args: {
    onClick: () => {
      alert("вы кликнули по кнопке с иконкой");
    },
    isActive: false,
    iconClass: "close",
    label: "кнопка закрытия",
    sizeIcon: 20,
    colorIcon: "secondary",
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
    colorIcon: "primary",
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
    colorIcon: "primary",
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
    colorIcon: "primary",
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
    colorIcon: "primary",
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
    colorIcon: "primary",
  },
};

//  чередование с сердцем

export const IconButtonUnLikedLikedTrue: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          paddingBlock: "20px",
          paddingInline: "5px",
          border: "2px solid black",
          background: "orange",
        }}
      >
        <IconButtonUI {...args} />
      </div>
    );
  },
  args: {
    onClick: () => {
      alert("вы кликнули по иконке");
    },
    isActive: false,
    iconActiveClass: "full-heart",
    iconClass: "heart",
    label: "лайкнутая кнопка",
    sizeIcon: 20,
    colorIcon: "primary",
  },
};
