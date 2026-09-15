import { combineReducers } from "redux";
// import { productsReducer } from "../../../entities/product/model/slice/productsSlice";
import { productsReducer } from "@/entities/product/model/slice/productsSlice";

//  создаем корневой редюсер
export const rootReducer = combineReducers({
  products: productsReducer,
});
