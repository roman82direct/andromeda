import { type FC } from "react";
import { AppHeaderUI } from "../ui/app-header";
import type { TIconType } from "@/shared/types/ui/icon";

type TNavIconsParams = {
  counterCart: number;
  counterFavorites: number;
};

//  логика работы все иконок в зависимости от того вошел ползьователь в систему или нет
//  положить getIcons  в отдельную папку utils импортировать оттуда
const getIcons = (
  isAuthenticated: boolean,
  { counterCart, counterFavorites }: TNavIconsParams,
): TIconType[] => {
  if (!isAuthenticated) {
    return [
      // просим залогиниться если не вошли
      { typeIcon: "come-in", typeEvent: { trigger: "route", path: "/login" } },
      { typeIcon: "heart", typeEvent: { trigger: "route", path: "/login" } },
      { typeIcon: "cart", typeEvent: { trigger: "route", path: "/login" } },
    ];
  }
  return [
    // если вошли предоставляем маршруты и счетчики
    { typeIcon: "profile", typeEvent: { trigger: "route", path: "/profile" } },
    {
      typeIcon: "full-heart",
      typeEvent: { trigger: "route", path: "/favorite" },
      counterNum: counterFavorites,
    },
    {
      typeIcon: "cart",
      typeEvent: { trigger: "route", path: "/cart" },
      counterNum: counterCart,
    },
  ];
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
