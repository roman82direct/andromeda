
import type { TEventType } from '@/shared/types/ui/icon';
import discountImage from '../../../assets/images/home-page/slider/banner-for-discount.jpg';
import deliveryImage from '../../../assets/images/home-page/slider/banner-for-delivery.jpg';
import newYear from '../../../assets/images/home-page/slider/banner-for-new-year.jpg';
import testImage1 from '../../../assets/images/home-page/slider/image1.jpg';
import testImage2 from '../../../assets/images/home-page/slider/image2.jpg';
import testImage3 from '../../../assets/images/home-page/slider/image3.jpg';


type TEventBanner = TEventType & {
  title: string;
}

type TSliderItem = {
  image: string;
  title: string;
  desc?: string;
  pathsForActions: TEventBanner[];
}

export type TSliderStore = TSliderItem[];

export const sliderStore:TSliderStore = [
  {
    image: discountImage,
    title: 'Скидки до 40% процентов на категорию “Распродажа”',
    desc: 'Успейте купить по выгодной цене',
    pathsForActions: [
      {
      title:'Подробнее',
      trigger: 'route',
      //  что здесь будет ????
      path:''
      },
      {
      title:'Каталог',
      trigger: 'route',
      //  нужно подраздел распродажа!!!! думать!!!
      path:'/catalog'
      },
    ]
  },
    {
    image: deliveryImage,
    title: "Доставка в подарок при покупке онлайн",
    pathsForActions: [{
      title:' Подробнее',
      trigger: 'route',
      // опять же куда переходим ???
      path:''
    }
    ]
  },
    {
    image: newYear,
    title: 'Главный подарок: наборы ёлочных игрушек с выгодой',
     pathsForActions: [
      {
      title:'Подробнее',
      trigger: 'route',
      //  что здесь будет ????
      path:''
      },
      {
      title:'Каталог',
      trigger: 'route',
      //  нужно подраздел какая категория ???!!!! думать!!!
      path:'/catalog'
      },
    ]
  },
  {
    image: testImage1,
    title: 'Уют в подарок: третий текстиль для дома бесплатно',
    desc: 'При покупке двух товаров из категории «Декор», третий — за 1 рубль',
     pathsForActions: [
      {
      title:'Подробнее',
      trigger: 'route',
      //  что здесь будет ????
      path:''
      },
      {
      title:'Каталог',
      trigger: 'route',
      //  нужно подраздел какая категория ???!!!! думать!!!
      path:'/catalog'
      },
    ]
  },
  {
    image: testImage2,
    title: 'Ночной Sale: дополнительная скидка 15% на всё',
    desc: 'Только до 8:00 утра введите промокод NIGHT2024 в корзине',
     pathsForActions: [
      {
      title:'Подробнее',
      trigger: 'route',
      //  что здесь будет ????
      path:''
      },
      {
      title:'Каталог',
      trigger: 'route',
      //  нужно подраздел какая категория ???!!!! думать!!!
      path:'/catalog'
      },
    ]
  },
  {
    image: testImage3,
     title: 'Весеннее обновление: новая коллекция мебели',
      desc: 'Натуральное дерево и минимализм в каждой детали',
     pathsForActions: [
      {
      title:'Подробнее',
      trigger: 'route',
      //  что здесь будет ????
      path:''
      },
      {
      title:'Каталог',
      trigger: 'route',
      //  нужно подраздел какая категория ???!!!! думать!!!
      path:'/catalog'
      },
    ]
  }
];