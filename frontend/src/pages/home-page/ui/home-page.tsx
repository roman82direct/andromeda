import type { FC } from "react";
import styles from "./home-page.module.css";

type TDescriptionBanner ={
  title: string;
  description: string;
  textLinks: string[];
}


type THomePageProps = {
    banners?: TDescriptionBanner[];
}

export const HomePageUI: FC<THomePageProps> = () => {
  return (
    <div className={styles.home}>
      <section className={styles['home-banner']}>
          <div className={styles.slider}>
            <div className={styles['banner-content']}>
              <h1 className={styles['banner-title']}>Скидки до 40% процентов на категорию “Распродажа”</h1>
              <div className={styles['banner-text']}>Успейте купить по выгодной цене</div>
              <div className="banner-actions"></div>
              

              </div>
          </div>
      </section>
      
    </div>
  );
};
