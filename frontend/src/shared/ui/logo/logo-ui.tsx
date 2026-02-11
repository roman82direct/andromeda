import type { FC } from "react";
import styles from "./logo-ui.module.css";
import clsx from "clsx";

type TLogoUIProps = {
  color: "dark-background" | "light-background";
};

export const LogoUI: FC<TLogoUIProps> = ({ color }) => {
  const styleColorClass =
    color === "light-background" ? styles["logo-light"] : styles["logo-dark"];
  return (
    <div className={clsx(styles.logo, styleColorClass)}>
      <span className={styles.logoProject}>Andromeda</span>
      <span className={styles.logoEntity}>Store</span>
    </div>
  );
};
