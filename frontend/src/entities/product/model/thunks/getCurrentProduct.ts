import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByArticulApi } from "../../api/productApi";
import { convertDTOtoIProduct } from "../utils/mappers";

export const getCurrentProductByArticul = createAsyncThunk(
  "products/getCurrentProduct",
  async (articul: string, thunkApi) => {
    try {
      const dataPriduct = await getProductByArticulApi(articul);
      const prepareProduct = convertDTOtoIProduct(dataPriduct);
      return prepareProduct;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      if (typeof error === "object" && error !== null && "detail" in error) {
        return thunkApi.rejectWithValue((error as { detail: string }).detail);
      }
      return thunkApi.rejectWithValue("Неизвестная ошибка при загрузке товара");
    }
  },
);
