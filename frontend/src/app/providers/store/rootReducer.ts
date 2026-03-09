import { combineReducers } from "redux";
import productsSlice from "@/entities/product/model/slice/productsSlice";
import modalReducer from "../../../entities/product/model/slice/modalSlice";

//  создаем корневой редюсер
export const rootReducer = combineReducers({
  products: productsSlice,
  modal: modalReducer,
});
