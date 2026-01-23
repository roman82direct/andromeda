import type { FC } from "react";
import styles from "./logo.module.css";

export const LogoUI: FC = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.logoProject}>Andromeda</span>
      <span className={styles.logoEntity}>Store</span>
    </div>
  );
};
