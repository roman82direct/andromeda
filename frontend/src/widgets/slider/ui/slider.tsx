
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type { TSliderUIProps } from "./types";

import React, { memo, useCallback, useMemo } from 'react';
import { SlideUI } from "./components/slide/slide";

export const SliderComponentUI = ({
  isAnimation,
  isDeleteAnimation,
  indexShowSlide,
  showingSlide,
  onSetIndexSlide,
  onHandleChangeSlide,
  indexesPag,
  toggleIntervalSlide,
}:TSliderUIProps) => {


  const handleDecrementSlide = useCallback(()=>{
    onHandleChangeSlide('decrement');
  },[onHandleChangeSlide]);
  const handleIncrementSlide = useCallback(()=>{
    onHandleChangeSlide('increment');
  },[onHandleChangeSlide]);
  
    // console.log(showingSlide)
    // мемоизация кнопок и вынос сложной логики с мемоизацией
    // для стилизации слайда и его элементов если темный фон или светлый чтобы с текстом не сливались
    // const themeSlideClass = showingSlide.typeTheme === 'light' ? 'is-light' : 'is-dark';
    const colorBtn =  showingSlide.typeTheme === 'dark' ? 'dark' : '';
    // const classAnimation =   isAnimation ? styles['slider-item-appeared'] : '';
    // const classDeleteSlideAnimation =  isDeleteAnimation ? styles['slider-item-disappeared'] : ''
  return (

      <div key={indexShowSlide} className={styles.slider} onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)} >
        
        <div className={styles.slides}>
          <SlideUI showingSlide={showingSlide} isAnimation={isAnimation} isDeleteAnimation={ isDeleteAnimation}/>
        </div>
         
             <div className={styles["slider-nav"]}>
                    <div className={styles["slider-arrows"]}>
                      <IconButtonUI
                        onClick={handleDecrementSlide}
                        iconClass={"arrow-right"}
                        isActive={false}
                        colorIcon={colorBtn ? "secondary" : "primary"}
                        sizeIcon={33}
                      />
                      <IconButtonUI
                        onClick={handleIncrementSlide}
                        iconClass={"arrow-left"}
                        isActive={false}
                        colorIcon={colorBtn ? "secondary" : "primary"}
                        sizeIcon={33}
                      />
                    </div>
                    <ul className={styles["slider-pag"]}>
                      {indexesPag.map((index) => (
                        <li key={index} className={styles["banner-pag-item"]}>
                          <IconButtonUI
                            onClick={() => {
                              onSetIndexSlide(index);
                            }}
                            iconActiveClass={"ellipse-filled"}
                            iconClass={"ellipse-emptied"}
                            isActive={index === indexShowSlide}
                            colorIcon={colorBtn ? "secondary" : "primary"}
                            sizeIcon={10}
                          />
                        </li>
                      ))}
                    </ul>
              </div>
      </div>
      
 
  );
};

export const SliderUI = memo(SliderComponentUI);
SliderUI.displayName = 'SliderUI';

