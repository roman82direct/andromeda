import styles from "./home-page.module.css";
import { Slider } from "@/widgets/slider";
import type { FC } from "react";

export const HomePageUI: FC = () => {
  return (
    <div className={styles.home}>
      <section className={styles["home-banner"]}>
        <Slider />
      </section>
    </div>
  );
};
