import type { FC } from "react";
import styles from "./counter.module.css";

type CounterUIProps = {
  counterQuantity?: number;
  message?: string;
};

export const CounterUI: FC<CounterUIProps> = ({
  counterQuantity,
  message = "товаров в корзине",
}) => {
  //  если товаров больше 99 ставить троеточие и подсказка
  const moreNinety = counterQuantity && counterQuantity > 99;
  const currentQuentity = moreNinety ? "..." : counterQuantity;
  return (
    <div
      title={moreNinety && message ? `У вас ${counterQuantity} ${message}` : ""}
      className={styles.counter}
    >
      <span className={styles.iconCartNum}>{currentQuentity ?? 0}</span>
    </div>
  );
};
