import { Link } from "react-router-dom";
import { LogoUI } from "../ui/logo";
import type { FC } from "react";

export const Logo: FC = () => {
  return (
    <Link
      aria-label="логотип сайта - переход на главную страницу сайта"
      to={"/"}
    >
      <LogoUI />
    </Link>
  );
};
