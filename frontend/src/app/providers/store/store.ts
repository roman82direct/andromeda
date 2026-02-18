import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch; // определяет какие экшены, тханки и пэйлоад допустимы

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
// useDispatch типизирован типом AppDispatch
export const useSelector = selectorHook.withTypes<RootState>();
//  юзеселектор будет доставить данные из хранилища типа RootState - втипизированный useSelector, который знает структуру всего состояния RootState

export default store;
