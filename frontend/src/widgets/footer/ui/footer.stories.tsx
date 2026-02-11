import type { Meta, StoryObj } from "@storybook/react";
import { FooterUI } from "./index";
import { MemoryRouter } from "react-router-dom";
import type { TIconType } from "@/shared/types/ui/icon";

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

const navIconsForFooter: TIconType[] = [
  {
    typeIcon: "facebook",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "instagram",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "youtube",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "visa",
    typeEvent: { trigger: "route", path: "" },
  },
  {
    typeIcon: "mastercard",
    typeEvent: { trigger: "route", path: "" },
  },
];

export const footerUI: Story = {
  args: {
    socialLinksIcons: navIconsForFooter,
    columnsListsLinks: [
      [
        {
          title: "Каталог",
          links: [
            { linkTitle: "New", path: "/new" },
            { linkTitle: "In Stock", path: "/in-stock" },
            { linkTitle: "Категории", path: "/categories" },
            { linkTitle: "Стили", path: "/styles" },
            { linkTitle: "Коллекции", path: "/collections" },
            { linkTitle: "Распродажа", path: "/sale" },
          ],
        },
      ],
      [
        {
          title: "Покупателям",
          links: [
            { linkTitle: "Оплата", path: "/payment" },
            { linkTitle: "Доставка", path: "/delivery" },
            { linkTitle: "Возврат и обмен", path: "/returns" },
            { linkTitle: "Гарантия и сервис", path: "/warranty" },
            { linkTitle: "Рассрочка и кредит", path: "/installments" },
            { linkTitle: "Программа лояльности", path: "/loyalty" },
          ],
        },
      ],
      [
        {
          title: "О нас",
          links: [
            { linkTitle: "О компании", path: "/about" },
            { linkTitle: "Новости компании", path: "/news" },
            { linkTitle: "Карьера", path: "/career" },
          ],
        },
      ],
      [
        {
          title: "Отзывы",
          links: [
            { linkTitle: "Яндекс", path: "/reviews/yandex" },
            { linkTitle: "Google", path: "/reviews/google" },
          ],
        },
        {
          title: "Контакты",
          links: [
            {
              linkTitle: "info@andromeda.ru",
              path: "mailto:info@andromeda.ru",
            },
            { linkTitle: "+7 999 999 99 99", path: "tel:+79999999999" },
          ],
        },
      ],
    ],
  },
};
