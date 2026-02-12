import { API_URL } from "@/shared/config/api"
import type { ProductDTO } from "./types";


export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));



export type TProductsResponse = ProductDTO[]


export const getProducts = () => {
  return fetch(`${API_URL}/products/`)
          .then((res) =>checkResponse<TProductsResponse>(res))
          .then((data)=>{
              return data
          })
}


//  как получить один товар 
//   проверь свое api почтитай в яндексе
//  слайс на товары
//  как учесть ограничения - для отложденной загрузки