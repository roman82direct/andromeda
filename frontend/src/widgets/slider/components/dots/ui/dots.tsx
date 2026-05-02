import type { TThemeElementsPage } from "@/shared/types/types";
import styles from "./dots.module.css";
import { IconButtonUI } from "@/shared/ui/icon-button";
import { memo } from "react";


type DotsProps = {
  activeSlideNumber: number,
  dotsPag: number[],
  onClick: (index:number)=>void;
  // импортировать тип из общих типов
  currentDotsTheme?: TThemeElementsPage;
  isBlockClickForDots?: boolean;
}

export const DotsUIComponent = (dotsData: DotsProps) => {
  const {
    activeSlideNumber,
    
    onClick,
    // тема слайдавлияет на тему отображения точек пагинации на фоне слайда
    currentDotsTheme,
    isBlockClickForDots
  } = dotsData;
    // console.log(dotsPag)
  return (
        //  !!!выделить отдельно в UI - смотри с 45 принцип проектирования книги паттерны проектирования
      <ul className={styles["slider-pag"]}>
      {[1,2,3].map((indexSlide) => (
        <li key={indexSlide} className={styles["banner-pag-item"]}>
          <IconButtonUI
            onClick={()=>onClick(indexSlide)}
            iconActiveClass={"ellipse-filled"}
            iconClass={"ellipse-emptied"}
            // сравниваем с тем, что сейчас отображается чтобы понять активную точку
            isActive={indexSlide === activeSlideNumber}
            //  создание  "темы" точек
            colorIcon={currentDotsTheme || 'primary'}
            sizeIcon={10}
            type='button'
            isDisabled={isBlockClickForDots}
          />
        </li>
      ))}
    </ul>
  );
};

export const DotsUI = memo(DotsUIComponent);

DotsUI.displayName = 'DotsUI'
