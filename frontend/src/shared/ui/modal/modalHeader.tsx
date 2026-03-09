// общий хедер для всех модальных окон
import styles from "./modalUI.module.css";
import { IconButtonUI } from "../icon-button";

type Props = {
    title?: string;
    onClose: () => void;
    onBack?: () => void;
}

const ModalHeader: React.FC<Props> = ({ title, onClose, onBack }) => {
  return (
    <div className={styles.header}>
        <div className={styles.left}>
            {onBack && <IconButtonUI isActive={false} colorIcon={"primary"} iconClass={"arrow-right"} onClick={onBack} />}
        </div>

        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.right}>
            <IconButtonUI isActive={false} colorIcon={"primary"} iconClass={"close"} onClick={onClose} />
        </div>
    </div>
  );
}

export default ModalHeader;