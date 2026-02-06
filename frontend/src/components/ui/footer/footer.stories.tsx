import type { Meta, StoryObj } from "@storybook/react";
import { FooterUI } from "./index";
import {MemoryRouter} from 'react-router-dom';

const meta: Meta<typeof FooterUI> = {
  component: FooterUI,
  title: "Components/ui/FooterUI",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
  },
  // render: (args)=>{
  //   return (
  //     <div style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           width: "500px",
  //           paddingBlock: "40px",
  //           paddingInline: "5px",
  //           border: "2px solid black",
  //           background: "#15242a",
  //       }}>
  //       <FooterUI {...args}/>
  //     </div>
  //   )
  // },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story/>
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof FooterUI>;

export const footerUI: Story = {
 
  args: {
    columnsListsLinks: [

      [
        {
          title: 'Каталог',
          links: [
            { linkTitle: 'New', path: '/new' },
            { linkTitle: 'In Stock', path: '/in-stock' },
            { linkTitle: 'Категории', path: '/categories' },
            { linkTitle: 'Коллекции', path: '/collections' },
            { linkTitle: 'Распродажа', path: '/sale' },
          ],
        }
      ],
      [
        {
          title: 'Покупателям',
          links: [
            { linkTitle: 'Оплата', path: '/payment' },
            { linkTitle: 'Доставка', path: '/delivery' },
            { linkTitle: 'Возврат и обмен', path: '/returns' },
            { linkTitle: 'Гарантия и сервис', path: '/warranty' },
            { linkTitle: 'Рассрочка и кредит', path: '/installments' },
            { linkTitle: 'Программа лояльности', path: '/loyalty' },
          ],
        }
      ],
      [
        {
          title: 'О нас',
          links: [
            { linkTitle: 'О компании', path: '/about' },
            { linkTitle: 'Новости компании', path: '/news' },
            { linkTitle: 'Карьера', path: '/career' },
          ],
        },
      ],
      [
        {
          title: 'Отзывы',
          links: [
            { linkTitle: 'Яндекс', path: '/reviews/yandex' },
            { linkTitle: 'Google', path: '/reviews/google' },
          ],
        },
        {
          title: 'Контакты',
          links: [
            { linkTitle: 'info@andromeda.ru', path: 'mailto:info@andromeda.ru' },
            { linkTitle: '+7 999 999 99 99', path: 'tel:+79999999999' },
          ],
        }
      ]
    ]
  },
};




