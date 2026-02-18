import type { TPaginationURL } from "../../api/types";
import { getCurrentProductByArticul } from "../thunks/getCurrentProduct";
import { getProductsByDiapason } from "../thunks/getProducts";
import type { IProduct } from "../types";
import { createSlice } from "@reduxjs/toolkit";

//  надо ли сделатьсчетчик продукта ?
//  поле ошибки разбить ?
export type TProductsState = {
  products: IProduct[];
  selectProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  //  если возвращаем ограниченный диапазон, а не все товары
  count: number | null;
  next: TPaginationURL | null;
  previous: TPaginationURL | null;
};

export const initialProductState: TProductsState = {
  products: [],
  selectProduct: null,
  error: null, // возмжно разбить на 2 части т к у нас 2 асинхронных тханка
  loading: false,
  // Ограниченный диапазон тоаваров
  count: null,
  next: null,
  previous: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    //  нужен редюсер (наличия товара в корзине с количеством)
    //
  },
  extraReducers: (builder) => {
    builder
      // для добавления диапазона товаров
      .addCase(getProductsByDiapason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByDiapason.rejected, (state, action) => {
        //  action -типизировать - тестировать ошибку
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
        //  смотри во вью
      })
      .addCase(getProductsByDiapason.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.count = action.payload.count || null;
        state.previous = action.payload.previous || null;
        state.next = action.payload.next || null;
        state.error = null;
      })
      // касаемо получения товара по артикулу
      .addCase(getCurrentProductByArticul.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentProductByArticul.rejected, (state, action) => {
        state.loading = false;
        state.selectProduct = null;
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
      })
      .addCase(getCurrentProductByArticul.fulfilled, (state, action) => {
        state.loading = false;
        state.selectProduct = action.payload;
        state.error = null;
      });
  },
});

// export default productsSlice;
//  типизировать объекты промиса
export default productsSlice.reducer;
