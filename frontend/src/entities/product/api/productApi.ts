import { API_URL } from "@/shared/config/api"
import type { ProductDTO } from "./types";

//  обработка ошибки промиса
export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));



export type TProductsResponse = ProductDTO[];

export type TProductResponse = ProductDTO;


export type TProductsDiapasonResponse = {
  count: number;
  next: PaginationURL;
  previous: PaginationURL;
  results: ProductDTO[];
}
type PaginationURL = string | null; // null - после конечных точек

// лимитированные запросы
// https://editor.swagger.io/
export const getProductsApi = () => {
  return fetch(`${API_URL}/products/`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) =>checkResponse<TProductsResponse>(res))
    .then((data)=>{
        return data
    })
}

export type TDiapasonQuery = {
    limit: number;
    offset: number;
}
//  для создания ленивой пагинации (скролл)
export const getProductsByDiapason = (querConf:TDiapasonQuery ) => {
    return fetch(`${API_URL}/products/?limit=${querConf.limit}&offset=${querConf.offset}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res)=> checkResponse<TProductsDiapasonResponse>(res))
      .then((data)=>data)
}

// `${API_URL}/products/?limit=${querConf.limit}&offset=${querConf.offset}` 
// естьсмысл сформировать объект регулярного выражения кот будет вовращать нам параметры 
// limit offset или просто метод поиска по строке parsedUrl.searchParams.get

export const getProductByArticulApi = (articul: string) => {
  return fetch(`${API_URL}/products/${articul}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TProductResponse>(res))
    .then((product)=>{
      return product
    })
}

//  как получить один товар 
//   проверь свое api почтитай в яндексе
//  слайс на товары
//  как учесть ограничения - для отложденной загрузки