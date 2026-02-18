//  сущности которые будем использовать в приложении
//   внутренний (Domain) Порт.
export interface IProduct {
  id: number;
  articul: string;
  title: string;
  description: string;
  price: number; // в отличие от DTO берем number вместо string
  isPublished: boolean;
  collection: IInfoPorduct;
  brand: IInfoPorduct;
  secondCategory: string;
  images: IImageProduct[];
  createdAt: string; // ISO дата
  updateAt: string; // ISO дата
  count?: number; // добавляем для обозначения количества товара в корзине
}

export interface IInfoPorduct {
  title: string;
  description: string;
}

export interface IImageProduct {
  imgUrl: string;
  isMain: boolean; // ??
  isPack: boolean; // ??
}
