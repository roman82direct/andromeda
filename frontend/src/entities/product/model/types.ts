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
  createdAt: Date; // ISO дата
  updateAt: Date; // ISO дата
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
