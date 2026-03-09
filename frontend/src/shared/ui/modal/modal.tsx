import { useEffect, type FC, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { ModalUI } from "./modalUI";
import { OverlayUI } from "../overlay";

type ModalProps = {
  title?: string;
  onClose: () => void;
  onBack?: () => void; // возможность вернуться на шаг назад есть пока только в логине
  children: ReactNode;
};

const modalRoot = document.getElementById("modals") as HTMLDivElement;

export const Modal: FC<ModalProps> = ({ title, onClose, onBack, children }) => {
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
    <>
      <OverlayUI onClick={onClose} />,
      <ModalUI title={title} onClose={onClose} onBack={onBack}>
        {children}
      </ModalUI>
    </>,
    modalRoot
  );
};
