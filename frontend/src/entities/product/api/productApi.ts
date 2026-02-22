import { API_URL } from "@/shared/config/api";
import { checkResponse } from "@/shared/api/base";
import type {
  TDiapasonQuery,
  TProductResponse,
  TProductsDTODiapasonResponse,
  TProductsResponse,
} from "./types";

//  если хотим получить все товары сразу
export const getProductsApi = () => {
  return fetch(`${API_URL}/products/`, {
    method: "GET",
    headers: {
       "Content-Type:" : "application/json;charset=utf-8",
    },
  })
    .then((res) => checkResponse<TProductsResponse>(res))
    .then((data) => {
      return data;
    });
};

//  получаем ограниченный лимит товаров
export const getProductsByDiapasonApi = (querConf: TDiapasonQuery) => {
  return fetch(
    `${API_URL}/products/?limit=${querConf.limit}&offset=${querConf.offset}`,
    {
      method: "GET",
      headers: {
         "Content-Type:" : "application/json;charset=utf-8",
      },
    },
  )
    .then((res) => checkResponse<TProductsDTODiapasonResponse>(res))
    // здесь исправить! в каком случае октлоняем промис ???
    .then((data) => data);
};

// получаем товар по артикулу
export const getProductByArticulApi = (articul: string) => {
  return fetch(`${API_URL}/products/${articul}/`, {
    method: "GET",
    headers: {
       "Content-Type:" : "application/json;charset=utf-8",
    },
  })
    .then((res) => checkResponse<TProductResponse>(res))
    .then((data) => {
      //  если у получ объекта нет артикула зн такого тоавра нет - отклоняем промис
      if(data?.articul) return data
      return Promise.reject(data);
    });
};
