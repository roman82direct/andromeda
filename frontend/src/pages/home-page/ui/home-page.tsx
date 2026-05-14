import styles from "./home-page.module.css";
import { Slider } from "@/widgets/slider";
import { SlideUI } from "@/widgets/slider/components/slide/slide";
import type { TSlideItem } from "@/widgets/slider/types";
import { useMemo, type FC } from "react";

export const HomePageUI: FC = () => {

  const renderedSlides = (slides:TSlideItem[])=>{
     return slides.map((slide, index) => {
         return <SlideUI key={index} showingSlide={slide} />
 })  }
  return (
    <div className={styles.home}>
      <h1 className="visually-hidden">Andromeda Store — магазин керамической посуды и аксессуаров для дома</h1>
      <section className={styles["home-banner"]}>
        <h2 className="visually-hidden">Актуальные акции и предложения</h2>
        <Slider isPagination={true}>
             {renderedSlides}
        </Slider>
      </section>
    </div>
  );
};
