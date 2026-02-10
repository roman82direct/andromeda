import { type FC } from "react";
import styles from "./app-header.module.css";
import { Logo } from "../../logo/logo";
import { SearchInput } from "../../search-input";
import type { TIconType } from "@/shared/types/ui/icon";
import { IconMenuUI } from "../icon-menu";

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
        {navIcons && <IconMenuUI navIcons={navIcons} variantMenu={"header"} />}
      </nav>
    </header>
  );
};
