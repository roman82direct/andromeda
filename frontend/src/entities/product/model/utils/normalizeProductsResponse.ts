import type { TProductsDTODiapasonResponse } from "../../api/types";
import type { TProductsDiapason } from "../types";
import { convertDTOtoIProduct } from "./mappers";

export const normalizeProductsResponse = (
  products: TProductsDTODiapasonResponse,
): TProductsDiapason => {
  //  незавимимо от ответа адаптируем данные по продуктам под свою архитектуру
  if ("results" in products) {
    //  если в end point передали параметыр запроса  limit: number; offset
    return {
      products: products.results.map(convertDTOtoIProduct),
      count: products.count,
      previous: products.previous,
      next: products.next,
    };
  }

  //  если мы не передали параметыр запроса  limit: ; offset: number то вернетя просто массив всех товаров
  // return products.map(convertDTOtoIProduct)
  //  поэтому адаптируем под нашу структуру данных
  return {
    products: products.map(convertDTOtoIProduct),
    //  остальные данные в слайсе оставляем null в этом случае если limit и offset не  указан
    //  промис вернет все товары какие есть - без ограничени
    count: null,
    previous: null,
    next: null,
  };
};
