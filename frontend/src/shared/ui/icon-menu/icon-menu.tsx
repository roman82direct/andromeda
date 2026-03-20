import { type FC } from "react";
import styles from "./icon-menu.module.css";
import { v4 as uuidv4 } from "uuid";
import { IconButtonUI } from "../icon-button";
import { IconUI } from "../icon";
import { NavLink } from "react-router-dom";
import type { TIconType } from "@/shared/types/ui/icon";
import clsx from "clsx";

type TIconMenuUIProps = {
  navIcons: TIconType[];
  variantMenu: "footer" | "header";
  iconsSize?: number;
};

export const IconMenuUI: FC<TIconMenuUIProps> = ({
  navIcons,
  variantMenu,
  iconsSize,
}) => {
  const styleMenuList = clsx(
    styles["menu-list"],
    variantMenu === "header"
      ? styles["menu-list_header"]
      : styles["menu-list_footer"],
  );
  // переделать стили чтобы было удобнеестилизовать ребенка header или foooter вешаем на  меню 
  return (
    <div className={styles.menu}>
      <div className={styles['menu-burger']}>
        <IconButtonUI isActive={false} iconClass={'burger'} iconActiveClass={'arrow-top'}  colorIcon={'primary'}/>
      </div>
      <ul className={styleMenuList}>
        {navIcons.map((navIcon) => (
          <li key={uuidv4()} className={styles["menu-item"]}>
            {/* оптимизировать размер иконки  в зависимости от типа иконки*/}
            {/* скачать иконку для смены темы и обернуть ее в button c кликом компонент IconButton */}
            {
              //  если кнопка - передаем callback
              navIcon.typeEvent.trigger === "action-on-page" ? (
                <IconButtonUI
                  onClick={navIcon.typeEvent.callback}
                  iconClass={navIcon.typeIcon}
                  isActive={false}
                  colorIcon={"primary"}
                  sizeIcon={iconsSize}
                />
              ) : (
                // если ссылка - передаем маршрут
                <NavLink
                  // доработать активную ссылку
                  //  чтобы иконка могла менять цвет - допустим цвет bacground черный  у активной сслыки - иконка белая
                  className={styles["menu-link"]}
                  to={`${navIcon.typeEvent.path}`}
                >
                  <IconUI
                    counterQuantity={navIcon.counterNum}
                    iconClass={`${navIcon.typeIcon}`}
                    interactiveMode
                    colorIcon={"primary"}
                    sizeIcon={iconsSize}
                  />
                </NavLink>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
