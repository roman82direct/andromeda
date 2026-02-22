import styles from "./overlay.module.css";

export const OverlayUI = ({ onClick }: { onClick: () => void }) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};
