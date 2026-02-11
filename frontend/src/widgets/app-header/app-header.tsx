import { type FC } from "react";
import { AppHeaderUI } from "./ui";
import { getIcons } from "./lib/getIcons";

export type TNavIconsParams = {
  counterCart: number;
  counterFavorites: number;
};

//  сделать хук useNavIcons на основе getIcons и там менять состояния в зависимости от счетчиков и авторизации юсера

export const AppHeader: FC = () => {
  const isAuthenticated = false; // прошел ли пользователь авторзацию
  //  const isAuthenticated = useSelector(isAuthenticated);
  const counterCart = 0;
  // const counterCart= useSelector(counterCart)
  const counterFavorites = 0;
  // const counterFavorites = useSelector(counterCart)
  const navIconsDefaultSetting = getIcons(isAuthenticated, {
    counterCart,
    counterFavorites,
  });

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
