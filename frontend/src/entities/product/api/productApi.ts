import { API_URL } from "@/shared/config/api"
import { checkResponse } from "@/shared/api/base";
import type { TDiapasonQuery, TProductResponse, TProductsDiapasonResponse, TProductsResponse } from "./types";


//  если хотим получить все товары сразу
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

//  получаем ограниченный лимит товаров
export const getProductsByDiapasonApi = (querConf:TDiapasonQuery ) => {
    return fetch(`${API_URL}/products/?limit=${querConf.limit}&offset=${querConf.offset}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res)=> checkResponse<TProductsDiapasonResponse>(res))
      .then((data)=>data)
}

// получаем товар по артикулу
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
