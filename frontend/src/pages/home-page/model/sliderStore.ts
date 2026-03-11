
import discountImage from "../../../assets/images/home-page/slider/banner-for-discount.jpg";
import deliveryImage from "../../../assets/images/home-page/slider/banner-for-delivery.jpg";
import newYear from "../../../assets/images/home-page/slider/banner-for-new-year.jpg";
import testImage1 from "../../../assets/images/home-page/slider/image1.jpg";
import testImage2 from "../../../assets/images/home-page/slider/image2.jpg";
import testImage3 from "../../../assets/images/home-page/slider/image3.jpg";
import test1 from "../../../assets/images/home-page/slider/test1.jpg";
import test2 from "../../../assets/images/home-page/slider/test2.jpg";
import test3 from "../../../assets/images/home-page/slider/test3.jpg";
import test4 from "../../../assets/images/home-page/slider/lessOne.jpg";
import test5 from "../../../assets/images/home-page/slider/less2.jpg";
import type { TSlideItem } from "@/shared/types/ui/slider";



// type TSliderItem = {
//   image: string;
//   title: string;
//   desc?: string;
//   pathsForActions: TEventBanner[];
//   type:'dark' | 'light'
// };

export type TSliderStore = TSlideItem[];

export const sliderStore: TSliderStore = [
  {
    image: discountImage,
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
    image: deliveryImage,
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
    image: newYear,
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
  {
    image: testImage1,
    title: "Уют в подарок: третий текстиль для дома бесплатно",
    desc: "При покупке двух товаров из категории «Декор», третий — за 1 рубль",
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
     typeTheme:'light'
  },
  {
    image: testImage2,
    title: "Ночной Sale: дополнительная скидка 15% на всё",
    desc: "Только до 8:00 утра введите промокод NIGHT2024 в корзине",
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
     typeTheme:'light'
  },
  {
    image: testImage3,
    title: "Весеннее обновление: новая коллекция мебели",
    desc: "Натуральное дерево и минимализм в каждой детали",
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
     typeTheme:'light'
  },
  {
    image: test1,
    title: "Умный свет: скидка 20% на все светильники",
    desc: "Создайте идеальную атмосферу с помощью дизайнерского освещения",
    pathsForActions: [
      { title: "Подробнее", trigger: "route", path: "/promo/smart-light" },
      { title: "Каталог", trigger: "route", path: "/catalog/lighting" },
    ],
     typeTheme:'light'
  },
  {
    image: test2,
    title: "Кухня мечты под ключ: вытяжка в подарок",
    desc: "При заказе кухонного гарнитура — техника для очистки воздуха бесплатно",
    pathsForActions: [
      { title: "Подробнее", trigger: "route", path: "/promo/kitchen-gift" },
      { title: "Каталог", trigger: "route", path: "/catalog/kitchen" },
    ],
     typeTheme:'light'
  },
  {
    image: test3,
    title: "Эко-коллекция: натуральные ткани и материалы",
    desc: "Постельное белье и шторы из органического хлопка и льна",
    pathsForActions: [
      { title: "Подробнее", trigger: "route", path: "/promo/eco-style" },
      { title: "Каталог", trigger: "route", path: "/catalog/textile" },
    ],
     typeTheme:'light'
  },
  {
    image: test4,
    title: "Рабочее место дома: всё для продуктивности",
    desc: "Эргономичные кресла и столы со скидкой до 25% при покупке комплектом",
    pathsForActions: [
      { title: "Подробнее", trigger: "route", path: "/promo/home-office" },
      { title: "Каталог", trigger: "route", path: "/catalog/office" },
    ],
     typeTheme:'light'
  },
  {
    image: test5,
    title: "Ванная комната: аксессуары для релакса",
    desc: "Обновите интерьер мелочами — от зеркал с подсветкой до мягких ковриков",
    pathsForActions: [
      { title: "Подробнее", trigger: "route", path: "/promo/bathroom-sale" },
      { title: "Каталог", trigger: "route", path: "/catalog/bathroom" },
    ],
     typeTheme:'light'
  },
  // {
  //   image: test5,
  //   title: 'Лишний',
  //   desc: 'Обновите интерьер мелочами — от зеркал с подсветкой до мягких ковриков',
  //   pathsForActions: [
  //     { title: 'Подробнее', trigger: 'route', path: '/promo/bathroom-sale' },
  //     { title: 'Каталог', trigger: 'route', path: '/catalog/bathroom' },
  //   ],
      //  typeTheme:'light'
  // }
];
