import type { CSSProperties, FC } from "react";
import  styles  from "./icon-button.module.css";
import clsx from "clsx";

//  работа со сложными иконками
type IconClassCssIcon = 'close' | 'come-in' | 'search' | 'global' | 'read' | 'info' | 'clock' | 'location' | 'cart' | 'heart' | 'full-heart' | 'profile' | 'home' | 'youtube' | 'facebook' | 'visa' | 'instagram' | 'mastercard';

//  возможно добавить кастомное изменение цвета иконки + псевдоклассы
type IconButtonUIProps = {
  isActive: boolean;
  iconActiveClass?: IconClassCssIcon;
  iconClass?: string;
  onClick?: ()=> void;
  label?: string
  sizeIcon?: number;
  type?: 'button' | 'submit' | 'reset'
  turnIcon?: number;
  isDisabled?: boolean
}

export const IconButtonUI: FC<IconButtonUIProps> = ({
  isActive = false,
  iconActiveClass,
  iconClass ='',
  onClick,
  label,
  sizeIcon = 20,
  type ='button',
  turnIcon = 1,
  isDisabled = false

}) => {
  const currentIconClass =  isActive && iconActiveClass ? iconActiveClass :  iconClass;
  const iconStyle = {
    '--size-icon': sizeIcon,
    '--turn': turnIcon
  } as CSSProperties
  return (
    <button disabled={isDisabled} aria-label={label} className={styles.iconButton} type={type} onClick={onClick}>
      {/*  отделить компонент иконки */}
      <div style={iconStyle} className={clsx(styles.icon, styles[currentIconClass])} aria-hidden = {true}/>
    </button>
  );
};
