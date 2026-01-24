import { type FC } from "react";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
// import { IconUI } from "../icon";
// import { Logo } from "../../logo/logo";
// import { SearchInput } from "../../search-input";
// import  type {IconClassCssIcon} from '../icon/icon';
// import {v4 as uuidv4} from 'uuid';

// export type TIconType = {typeIcon:IconClassCssIcon, counter?: number, path: string}
// const navIcons: TIconType [] = [
//   //  если мы вошли - то смена иконки 'come-in' допустим на profile
//   {typeIcon:'come-in', path:"/"},
//   {typeIcon:'heart', path: "/"},
//   {typeIcon: 'cart', path: "/", }
// ];

type AppHeaderProps = {
  // navIcons?: TIconType [];
};

// const navIcons: TIconType [] = [
//   //  если мы вошли - то смена иконки 'come-in' допустим на profile
//   {typeIcon:'come-in', path:"/"},
//   {typeIcon:'heart', path: "/"},
//   {typeIcon: 'cart', path: "/", }
// ];

export const AppHeader: FC<AppHeaderProps> = (
  {
    // менять иконки - выход и вход
    // navIcons
  },
) => {
  //  контекст
  //  посмотри макет петровича адаптив
  //  шапка по макету + адаптивность шапки
  // найти норм иконку для title header
  //  сделать кнопку сменить тему - на ночную
  // исправить фокус у иконок
  // сделать компоненты доступными
  return <header className={styles.header}></header>;
};
