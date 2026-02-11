import { Link } from "react-router-dom";
import { LogoUI } from "./logo-ui";
import type { FC } from "react";
import styles from "./logo.module.css";

type LogoProps = {
  color: "dark-background" | "light-background";
};

export const Logo: FC<LogoProps> = ({ color }) => {
  return (
    <Link
      className={styles["logo-link"]}
      aria-label="логотип сайта - переход на главную страницу сайта"
      to={"/"}
    >
      <LogoUI color={color} />
    </Link>
  );
};
