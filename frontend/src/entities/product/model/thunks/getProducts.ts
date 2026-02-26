import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsByDiapasonApi } from "../../api/productApi";
import { type TDiapasonQuery } from "../../api/types";
import { normalizeProductsResponse } from "../utils/normalizeProductsResponse";

// тестирование
// export const getProductsByDiapasonApiTest = (querConf:TDiapasonQuery) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // объект с полем messages, как checkResponse ожидает
//       reject({ messages: "Internal server error" });
//     }, 500);
//   });
// };

export const getProductsByDiapason = createAsyncThunk(
  "products/getProducts",
  async (querConf: TDiapasonQuery = { limit: 0, offset: 0 }, thunkApi) => {
    // querConf ={limit:0, offset:0}  если ничего не передать
    // получим просто массив всех товаров т е просто массив товаров вместо объекта с полем result( если limit:5, offset:2)

    try {
      const data = await getProductsByDiapasonApi(querConf);
      //  преобразуем уже возвращенный промис с продуктами в совместимый с нашим приложением формат
      const prepareDataproducts = normalizeProductsResponse(data);

      return prepareDataproducts;
    } catch (error: unknown) {
      //  подумать насчет обработки ошибки
      if (error instanceof TypeError) {
        return thunkApi.rejectWithValue(`Сетевая ошибка ${error.message}`);
      } else if (error instanceof Error) {
        return thunkApi.rejectWithValue(`Ошибка ${error.message}`);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "messages" in error
      ) {
        // если сервер вернул объект с полем messages
        return thunkApi.rejectWithValue(error.messages);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "detail" in error
      ) {
        return thunkApi.rejectWithValue(error.detail);
      }
      return thunkApi.rejectWithValue(
        "Сервер отклонил запрос или ошибка неизвестна",
      );
    }
  },
);
