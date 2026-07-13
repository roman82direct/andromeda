import { OverviewProductsTabs } from "@/widgets/overview-products-tabs";
import styles from "./home-page.module.css";
import { MainPromoSlider } from "@/widgets/main-promo-slider";
// import { renderedSlides } from "@/widgets/slider/utils/renderSlides";
import { type FC } from "react";
import { PromoActionsCards } from "@/widgets/promo-actions-cards/promo-actions-cards";

export const HomePageUI: FC = () => {
  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">
        Andromeda Store — магазин керамической посуды и аксессуаров для дома
      </h1>
      <section className={styles["home-banner"]}>
        <h2 className="visually-hidden">Актуальные акции и предложения</h2>
        {/*  здесь можно получать слайды а можно в самом умном компоненте виджета */}
        < MainPromoSlider isPagination={true} />
      </section>
      <section className={styles["groups-products"]}>
        <h2 className="visually-hidden">Обзор основных групп товаров и промоакций</h2>
        <OverviewProductsTabs />
        <PromoActionsCards/>
      </section>
      <section className={styles[""]}>
        <h2 className="visually-hidden">Тренды и новинки</h2>
        {/* <Slider/> */}
        {/* <Slider/> */}
      </section>
    </div>
  );
};
