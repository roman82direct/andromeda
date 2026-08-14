import type { Meta, StoryObj } from "@storybook/react";
import { CardProductUI } from "./card-product";
import image from "../../../../../assets/images/card-product/test-card/PROVANCE Нэви Комплект постельного белья.jpg";
import image2 from "../../../../../assets/images/card-product/test-card/чайник.jpg";
import image3 from "../../../../../assets/images/card-product/test-card/test3.jpg";

const meta = {
  title: "entities/product/card-product/CardProduct",
  component: CardProductUI,
  tags: ["autodocs"],
} satisfies Meta<typeof CardProductUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardProductWithOldPrice: Story = {
  args: {
    price: 3490,
    oldPrice: 4570,
    productName:
      "PROVANCE Нэви Комплект постельного белья евро (4 предмета), бязь, 100% хлопок, 2 дизайна",
    reviewsNum: 500,
    rating: "3.3",
    isFavorite: false,
    isNew: true,
    images: {
      pathsImages: [image],
    },
  },
};

export const CardProductFavorite: Story = {
  args: {
    price: 5700,
    productName: 'VETTA Чайник стальной 2,5л "Гаро", индукция',
    reviewsNum: 35,
    rating: "5.0",
    isFavorite: true,
    isNew: false,
    images: {
      pathsImages: [image2],
    },
  },
};

export const CardProductWithoutRatingAndReviews: Story = {
  args: {
    price: 720,
    productName: "Набор чайный 2 пр., 180мл, MILLIMI, Аквамарин, фарфор",
    isFavorite: true,
    isNew: false,
    images: {
      pathsImages: [image3],
    },
  },
};
