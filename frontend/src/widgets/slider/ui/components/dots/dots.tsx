import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useContext } from "react";
import styles from "./dots.module.css";
import { IconButtonUI } from "@/shared/ui/icon-button";

export const Dots = () => {
  const {
    slideNumber,
    dotsPag,
    setIndexSlide,
    // тема слайдавлияет на тему отображения точек пагинации на фоне слайда
    currentSlideTheme,
  } = useContext(SliderContext);
  // slideNumber -  номер текущего слайда котрый на "экране"
  const handleSetSlide = useCallback(
    (index: number) => {
      return () => setIndexSlide(index);
    },
    [setIndexSlide],
  );
  // на основе текущего слайда (его фона) определим тему точек
  const themePag = currentSlideTheme === "light" ? "primary" : "secondary";

  return (
    <ul className={styles["slider-pag"]}>
      {dotsPag.map((indexSlide) => (
        <li key={indexSlide} className={styles["banner-pag-item"]}>
          <IconButtonUI
            onClick={handleSetSlide(indexSlide)}
            iconActiveClass={"ellipse-filled"}
            iconClass={"ellipse-emptied"}
            // сравниваем с тем, что сейчас отображается чтобы понять активную точку
            isActive={indexSlide === slideNumber}
            //  создание  "темы" точек
            colorIcon={themePag}
            sizeIcon={10}
          />
        </li>
      ))}
    </ul>
  );
};
