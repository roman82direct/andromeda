import  { type FC, type ReactNode } from "react";
import { OverlayUI } from "../overlay";
import styles from './modalUI.module.css';
import { IconButtonUI } from "../icon-button";
//  подумать следуте ли обернуть в memo ? тогда нужно делаль useMemo для функции calback ?
type ModalUIProps = {
  onClose:() => void;
  children: ReactNode;
  title?: string
}

export const ModalUI: FC<ModalUIProps> = ({ 
  onClose, 
  children, 
  title
}) => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles['button-wrapper']}>
            <IconButtonUI isActive={false}  colorIcon={"secondary"} iconClass={'close'} onClick={onClose}/>
          </div>
          {title && <h3 className={styles.title}>{title}</h3>}
         </div>
        {children}
      </div>
      <OverlayUI onClick={onClose}/>
    </>
  );
};