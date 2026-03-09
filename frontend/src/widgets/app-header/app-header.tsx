import { type FC } from "react";
import { AppHeaderUI } from "./ui";
import { getIcons } from "./model/getIcons";
import { useDispatch } from "@/app/providers/store/store";
import { openModal } from "@/entities/product/model/slice/modalSlice";

export type TNavIconsParams = {
  counterCart: number;
  counterFavorites: number;
  openLoginModal: () => void;
};

//  сделать хук useNavIcons на основе getIcons и там менять состояния в зависимости от счетчиков и авторизации юсера

export const AppHeader: FC = () => {
  const isAuthenticated = false; // прошел ли пользователь авторзацию
  //  const isAuthenticated = useSelector(isAuthenticated);
  const counterCart = 0;
  // const counterCart= useSelector(counterCart)
  const counterFavorites = 0;
  // const counterFavorites = useSelector(counterCart)
  const dispatch = useDispatch();

  // логика открытия модалки при клике на иконки, если пользователь не авторизован
  const openLoginModal = () => {
    dispatch(openModal("login"));
  }

  const navIconsDefaultSetting = getIcons(isAuthenticated, {
    counterCart,
    counterFavorites,
    openLoginModal,
  })

  return <AppHeaderUI navIcons={navIconsDefaultSetting} />;
};

// cхема
// Redux / State <=> Api проекта
//    ↓
// AppHeader (адаптер)
//    ↓
// getIcons (чистая логика)
//    ↓
// AppHeaderUI (презентация)
