import { useEffect, type FC, type ReactNode } from "react";
import { ModalUI } from "./modalUI";
import ReactDOM from "react-dom";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

const modalRoot = document.getElementById("modals") as HTMLDivElement;

export const Modal: FC<ModalProps> = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot,
  );
};
