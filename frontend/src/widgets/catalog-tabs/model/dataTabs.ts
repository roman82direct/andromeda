import type { Tab } from "../types";

import textileJPG1x from "@/assets/images/home-page/tabs/categories/link4/1x/textile.jpg";
import textileJPG2x from "@/assets/images/home-page/tabs/categories/link4/2x/textile.jpg";
import textileAvif1x from "@/assets/images/home-page/tabs/categories/link4/1x/textile.avif";
import textileAvif2x from "@/assets/images/home-page/tabs/categories/link4/2x/textile.avif";
import textileWebp1x from "@/assets/images/home-page/tabs/categories/link4/1x/textile.webp";
import textileWebp2x from "@/assets/images/home-page/tabs/categories/link4/2x/textile.webp";


import dishesJPG1x from "@/assets/images/home-page/tabs/categories/link2/1x/dishes.jpg";
import dishesJPG2x from "@/assets/images/home-page/tabs/categories/link2/2x/dishes.jpg";
import dishesAvif1x from "@/assets/images/home-page/tabs/categories/link2/1x/dishes.avif";
import dishesAvif2x from "@/assets/images/home-page/tabs/categories/link2/2x/dishes.avif";
import dishesWebp1x from "@/assets/images/home-page/tabs/categories/link2/1x/dishes.webp";
import dishesWebp2x from "@/assets/images/home-page/tabs/categories/link2/2x/dishes.webp";


import decorGiftsJPG1x from "@/assets/images/home-page/tabs/categories/link1/1x/decor-gifts.jpg";
import decorGiftsJPG2x from "@/assets/images/home-page/tabs/categories/link1/2x/decor-gifts.jpg";
import decorGiftsAvif1x from "@/assets/images/home-page/tabs/categories/link1/1x/decor-gifts.avif";
import decorGiftsAvif2x from "@/assets/images/home-page/tabs/categories/link1/2x/decor-gifts.avif";
import decorGiftsWebp1x from "@/assets/images/home-page/tabs/categories/link1/1x/decor-gifts.webp";
import decorGiftsWebp2x from "@/assets/images/home-page/tabs/categories/link1/2x/decor-gifts.webp";


import kithenStorageJPG1x from "@/assets/images/home-page/tabs/categories/link3/1x/kithen-storage.jpg";
import kithenStorageJPG2x from "@/assets/images/home-page/tabs/categories/link3/2x/kithen-storage.jpg";
import kithenStorageAvif1x from "@/assets/images/home-page/tabs/categories/link3/1x/kithen-storage.avif";
import kithenStorageAvif2x from "@/assets/images/home-page/tabs/categories/link3/2x/kithen-storage.avif";
import kithenStorageWebp1x from "@/assets/images/home-page/tabs/categories/link3/1x/kithen-storage.webp";
import kithenStorageWebp2x from "@/assets/images/home-page/tabs/categories/link3/2x/kithen-storage.webp";









  export const catalog:Tab[] = [
    {
      tabTitle:'Категории',
      tabContent: [{
        image:{
          jpg: {"1x":textileJPG1x,"2x":textileJPG2x},
          avif: {"1x":textileAvif1x ,"2x":textileAvif2x},
          webp: {"1x":textileWebp1x,"2x":textileWebp2x},
        },
        descpImage:'Домашний текстиль',
        link:'/catalog',
      },
      {
          image:{
            jpg: {"1x": dishesJPG1x,"2x": dishesJPG2x},
            avif: {"1x": dishesAvif1x ,"2x": dishesAvif2x},
            webp: {"1x": dishesWebp1x,"2x": dishesWebp2x},
          },
        descpImage:'Посуда',
        link:'/catalog',
      },
      {
          image:{
            jpg: {"1x": decorGiftsJPG1x,"2x": decorGiftsJPG2x},
            avif: {"1x": decorGiftsAvif1x ,"2x": decorGiftsAvif2x},
            webp: {"1x": decorGiftsWebp1x,"2x": decorGiftsWebp2x},
        },
          descpImage:'Декор и подарки',
          link:'/catalog',
        },
           {
            image:{
              jpg: {"1x": kithenStorageJPG1x,"2x": kithenStorageJPG2x},
              avif: {"1x": kithenStorageAvif1x ,"2x": kithenStorageAvif2x},
              webp: {"1x": kithenStorageWebp1x,"2x": kithenStorageWebp2x},
            },
          descpImage:'Кухня и хранение',
          link:'/catalog',
        }
      
      ],
      isActive: true
    },
    {
      tabTitle: 'Коллекции',
      tabContent:[ {
        image:{
          jpg: {"1x":textileJPG1x,"2x":textileJPG2x},
          avif: {"1x":textileAvif1x ,"2x":textileAvif2x},
          webp: {"1x":textileWebp1x,"2x":textileWebp2x},
        },
        descpImage:'Посуда',
        link:'/catalog'
      }],
      isActive: false
    },
    
  ]