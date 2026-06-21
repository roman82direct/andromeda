import { CatalogTabs } from "@/widgets/catalog-tabs";
import styles from "./home-page.module.css";
import { Slider } from "@/widgets/slider";
// import { renderedSlides } from "@/widgets/slider/utils/renderSlides";
import {  type FC } from "react";

export const HomePageUI: FC = () => {


  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">Andromeda Store — магазин керамической посуды и аксессуаров для дома</h1>
      <section className={styles["home-banner"]}>
        <h2 className="visually-hidden">Актуальные акции и предложения</h2>
        <Slider isPagination={true}/>
       </section>
       <section className={styles['groups-products']}>
          <h2 className="visually-hidden">Обзор основных групп товаров</h2>
             <CatalogTabs/>
            {/* <QuickTypesCards/> */}
       </section>
       <section className={styles['']}>
          <h2 className="visually-hidden">Тренды и новинки</h2>
           {/* <Slider/> */}
            {/* <Slider/> */}
       </section>
       
       
    </div>
  );
};
