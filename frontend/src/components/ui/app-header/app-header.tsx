import { type FC } from "react";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { IconUI } from "../icon";
import { Logo } from "../../logo/logo";
import { SearchInput } from "../../search-input";
import type { IconClassCssIcon } from "../icon/icon";
import { v4 as uuidv4 } from "uuid";
import { IconButtonUI } from "../icon-button";

export type TEventType =
  | {
      trigger: "route";
      path: string;
    }
  | {
      trigger: "action-on-page";
      callback: () => void;
    };

export type TIconType = {
  typeIcon: IconClassCssIcon;
  counterNum?: number;
  typeEvent: TEventType;
};

type AppHeaderUIProps = {
  navIcons?: TIconType[];
};

export const AppHeaderUI: FC<AppHeaderUIProps> = ({ navIcons }) => {
  //  контекст
  //  посмотри макет петровича адаптив
  //  шапка по макету + адаптивность шапки
  // найти норм иконку для title header
  //  сделать кнопку сменить тему - на ночную
  // исправить фокус у иконок
  // сделать компоненты доступными
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* фиксить компонент поиска - стили */}
        <div className={styles.search}>
          <SearchInput />
        </div>
        <div className={styles.logo}>
          <Logo color="light-background" />
        </div>
        <div className={styles.menu}>
          {/*  весь список превратить в чилрен функцию */}
          <ul className={styles["menu-list"]}>
            {navIcons &&
              navIcons.length > 0 &&
              navIcons.map((navIcon) => (
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
                        colorIcon={'primary'}
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
                          colorIcon={'primary'}
                        />
                      </NavLink>
                    )
                  }
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
