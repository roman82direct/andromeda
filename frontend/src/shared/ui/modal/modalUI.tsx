import { type FC, type ReactNode } from "react";
import { OverlayUI } from "../overlay";
import styles from "./modalUI.module.css";
import ModalHeader from "./modalHeader";

//  подумать следуте ли обернуть в memo ? тогда нужно делаль useMemo для функции calback ?
type ModalUIProps = {
  onClose: () => void;
  onBack?: () => void;
  children: ReactNode;
  title?: string;
};

export const ModalUI: FC<ModalUIProps> = ({ onClose, onBack,children, title }) => {
  return (
    <>
      <OverlayUI onClick={onClose} />
      <div className={styles.modal}>
        <ModalHeader title={title} onClose={onClose} onBack={onBack} />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
