import { combineReducers } from "redux";
import  productsSlice  from "@/entities/product/model/slice/productsSlice";
//  создаем корневой редюсер
export const rootReducer = combineReducers({
    products: productsSlice 
});