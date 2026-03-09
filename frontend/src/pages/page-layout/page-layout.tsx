import { AppHeader } from "@/widgets/app-header";
import { Footer } from "@/widgets/footer";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./page-layot.module.css";
import { ModalRoot } from "@/shared/ui/modal-root/modalRoot";

export const PageLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ModalRoot /> // модальное окно в корневом компоненте приложения, чтобы его можно было вызвать из любой части приложения
      <Footer />
    </>
  );
};
