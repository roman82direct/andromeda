import { AppHeader } from "@/widgets/app-header";
import { Footer } from "@/widgets/footer";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from './page-layot.module.css';

export const PageLayout: FC =  () => {
      
  return (<>
    <AppHeader/>
      <main className={styles.main}>
         <Outlet/>
      </main>
    <Footer/>
  </>)
}