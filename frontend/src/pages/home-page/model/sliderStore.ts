import slide1Img1xJpg from '@/assets/images/home-page/slider/slide1/1x/image1x.jpg';
import slide1Img1xAvif from '@/assets/images/home-page/slider/slide1/1x/image1x.avif';
import slide1Img1xWebp from '@/assets/images/home-page/slider/slide1/1x/image1x.webp';
import slide1Img2xJpg from '@/assets/images/home-page/slider/slide1/2x/image2x.jpg';
import slide1Img2xAvif from '@/assets/images/home-page/slider/slide1/2x/image2x.avif';
import slide1Img2xWebp from '@/assets/images/home-page/slider/slide1/2x/image2x.webp';

import slide2Img1xJpg from '@/assets/images/home-page/slider/slide2/1x/image1x.jpg';
import slide2Img1xAvif from '@/assets/images/home-page/slider/slide2/1x/image1x.avif';
import slide2Img1xWebp from '@/assets/images/home-page/slider/slide2/1x/image1x.webp';
import slide2Img2xJpg from '@/assets/images/home-page/slider/slide2/2x/image2x.jpg';
import slide2Img2xAvif from '@/assets/images/home-page/slider/slide2/2x/image2x.avif';
import slide2Img2xWebp from '@/assets/images/home-page/slider/slide2/2x/image2x.webp';

import slide3Img1xJpg from '@/assets/images/home-page/slider/slide3/1x/image1x.jpg';
import slide3Img1xAvif from '@/assets/images/home-page/slider/slide3/1x/image1x.avif';
import slide3Img1xWebp from '@/assets/images/home-page/slider/slide3/1x/image1x.webp';
import slide3Img2xJpg from '@/assets/images/home-page/slider/slide3/2x/image2x.jpg';
import slide3Img2xAvif from '@/assets/images/home-page/slider/slide3/2x/image2x.avif';
import slide3Img2xWebp from '@/assets/images/home-page/slider/slide3/2x/image2x.webp';

import type { TSlideItem } from '@/shared/types/ui/slider';


export type TSliderStore = TSlideItem[];



 export const sliderStore: TSliderStore = [
  {
    image: {
       avif: {
        "1x": slide1Img1xAvif ,
        "2x": slide1Img2xAvif,
       },
      webp: {
        "1x": slide1Img1xWebp,
        "2x": slide1Img2xWebp,
      },
      jpg: {
        "1x": slide1Img1xJpg,
        "2x": slide1Img2xJpg,
      }
    },
    title: "Скидки до 40% процентов на категорию “Распродажа”",
    desc: "Успейте купить по выгодной цене",
    typeTheme:'light',
    pathsForActions: [
      {
        title: "Подробнее",
        trigger: "route",
        //  что здесь будет ????
        path: "",
      },
      {
        title: "Каталог",
        trigger: "route",
        //  нужно подраздел распродажа!!!! думать!!!
        path: "/catalog",
      },
    ],
  },
  {
    image: {
       avif: {
        "1x": slide2Img1xAvif ,
        "2x": slide2Img2xAvif,
       },
      webp: {
        "1x": slide2Img1xWebp,
        "2x": slide2Img2xWebp,
      },
      jpg: {
        "1x": slide2Img1xJpg,
        "2x": slide2Img2xJpg,
      }
    },
    title: "Доставка в подарок при покупке онлайн",
    pathsForActions: [
      {
        title: " Подробнее",
        trigger: "route",
        // опять же куда переходим ???
        path: "",
      },
    ],
    typeTheme:'light'
  },
  {
    image: {
       avif: {
        "1x": slide3Img1xAvif ,
        "2x": slide3Img2xAvif,
       },
      webp: {
        "1x": slide3Img1xWebp,
        "2x": slide3Img2xWebp,
      },
      jpg: {
        "1x": slide3Img1xJpg,
        "2x": slide3Img2xJpg,
      }
    },
    title: "Главный подарок: наборы ёлочных игрушек с выгодой",
    desc:"Новогоднее описание",
    pathsForActions: [
      {
        title: "Подробнее",
        trigger: "route",
        //  что здесь будет ????
        path: "",
      },
      {
        title: "Каталог",
        trigger: "route",
        //  нужно подраздел какая категория ???!!!! думать!!!
        path: "/catalog",
      },
    ],
    typeTheme:'dark'
  },

];
