import type { TIconType } from "@/shared/types/ui/icon";
import type { TNavIconsParams } from "../app-header";

//  логика работы все иконок в зависимости от того вошел ползьователь в систему или нет
//  положить getIcons  в отдельную папку utils импортировать оттуда
export const getIcons = (
  isAuthenticated: boolean,
  { counterCart, counterFavorites, openLoginModal }: TNavIconsParams,
): TIconType[] => {
  if (!isAuthenticated) {
    return [
      // просим залогиниться если не вошли, при этом вылезает модалка без проута на другую страницу
      { typeIcon: "come-in", typeEvent: { trigger: "action-on-page", callback: openLoginModal } },
      { typeIcon: "heart", typeEvent: { trigger: "action-on-page", callback: openLoginModal } },
      { typeIcon: "cart", typeEvent: { trigger: "action-on-page", callback: openLoginModal } },
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
