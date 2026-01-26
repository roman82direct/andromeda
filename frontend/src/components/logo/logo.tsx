import { Link } from "react-router-dom";
import { LogoUI } from "../ui/logo";
import type { FC } from "react";
import styles from "./logo.module.css";

export const Logo: FC = () => {
  return (
    <Link
      className={styles["logo-link"]}
      aria-label="логотип сайта - переход на главную страницу сайта"
      to={"/"}
    >
      <LogoUI />
    </Link>
  );
};
