import type { TIconType } from "@/shared/types/ui/icon";
import type { TNavIconsParams } from "../app-header";

//  логика работы все иконок в зависимости от того вошел ползьователь в систему или нет
//  положить getIcons  в отдельную папку utils импортировать оттуда
export const getIcons = (
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
