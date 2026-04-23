import styles from "./home-page.module.css";
import { Slider } from "@/widgets/slider";
import type { FC } from "react";

export const HomePageUI: FC = () => {
  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">Andromeda Store — магазин керамической посуды и аксессуаров для дома</h1>
      <section className={styles["home-banner"]}>
        <Slider />
      </section>
    </div>
  );
};
