import type { FC } from "react";
import  styles  from "./icon-cart-button.module.css";
import { IconButtonUI } from "../icon-button";
import { CounterUI } from "../counter";


//  возможно добавить кастомное изменение цвета иконки + псевдоклассы
type IconCartButtonUIProps = {
  counterQuantity?: number;
  onClick?:()=>void;
}

export const IconCartButtonUI: FC<IconCartButtonUIProps> = ({
  counterQuantity,
  onClick
}) => {
  return (
    <div className={styles.iconCartContainer}>
      <IconButtonUI onClick={onClick} isActive={false} iconClass='cart' sizeIcon={20}>
        {
          counterQuantity && counterQuantity > 0 && (
              <CounterUI counterQuantity={counterQuantity}/>
          )
        }
        </IconButtonUI>
    </div>
  );
};
