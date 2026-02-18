

//  ProductDTO сущности продукта получаемые с сервера необходимо адаптировать под наше приложение
//  внешний Порт (Contract API)
export interface ProductDTO {
  id: number;
  articul: string;
  title: string;
  description: string;
  price: string; // !!!сервер присылает строку!
  is_published: boolean;
  collection: CollectionDTO;
  brand: BrandDTO;
  second_category: string;
  images: ProductImageDTO[];
  created_at: string; // ISO дата
  update_at: string; // ISO дата
}

export interface CollectionDTO {
  title: string;
  description: string;
}

export interface BrandDTO {
  title: string;
  description: string;
}

export interface ProductImageDTO {
  img_url: string;
  is_main: boolean;
  is_pack: boolean;
}

// Производные


export type TProductsResponse = ProductDTO[];

//  если продукта  по несуществующему артикулу
export type TWrongArticul = {detail: string};
//  если получаем один продукт по артикулу
export type TProductResponse = ProductDTO;

//  если мы не зададим параметры запроса для диапазона товаров,
//  то вернется просто ответ с массивом товаров
//  это следует учесть при типизации ответа от сервера
export type TProductsDiapasonResponse = {
  count: number;
  next: TPaginationURL;
  previous: TPaginationURL;
  results: ProductDTO[];
} | ProductDTO[];

export type TPaginationURL = string | null; // null - после конечных точек


//  параметры пагинации
export type TDiapasonQuery = {
    limit: number; // размер 
    offset: number; // откуда
}

//  конфигурация направления - если для пагинации пригодится
export type TDirectionPagConf = {
  direction: 'previous' | 'next'; // можем листать взад вперед
  queryConf: TDiapasonQuery;

}