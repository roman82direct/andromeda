import { ButtonUI } from "@/shared/ui/button";
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type { TSliderUIProps } from "./types";
import clsx from "clsx";
import React, { memo, useCallback, useMemo } from 'react';

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
  // надо ли это мемоизировать ?
    const backgroundImageSrc =useMemo(()=>({
      '--fallback-bg': `url("${showingSlide.image.jpg["1x"]}")`,
      '--slide-bg': 
     `image-set(
        url("${showingSlide.image.avif["1x"]}") 1x,
        url("${showingSlide.image.avif["2x"]}") 2x,
        url("${showingSlide.image.webp["1x"]}") 1x,
        url("${showingSlide.image.webp["2x"]}") 2x,
        url("${showingSlide.image.jpg["1x"]}") 1x,
        url("${showingSlide.image.jpg["2x"]}") 2x
    )`
  } as React.CSSProperties
),[showingSlide])

  const handleDecrementSlide = useCallback(()=>{
    onHandleChangeSlide('decrement');
  },[onHandleChangeSlide]);
  const handleIncrementSlide = useCallback(()=>{
    onHandleChangeSlide('increment');
  },[onHandleChangeSlide]);
  
    // console.log(showingSlide)
    // мемоизация кнопок и вынос сложной логики с мемоизацией
    // для стилизации слайда и его элементов если темный фон или светлый чтобы с текстом не сливались
    const themeSlideClass = showingSlide.typeTheme === 'light' ? 'is-light' : 'is-dark';
    const colorBtn =  showingSlide.typeTheme === 'dark' ? 'dark' : '';
    const classAnimation =   isAnimation ? styles['slider-item-appeared'] : '';
    const classDeleteSlideAnimation =  isDeleteAnimation ? styles['slider-item-disappeared'] : ''
  return (

      <div key={indexShowSlide} className={styles.slider} onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)} >
      
          <div className={
                          clsx(
                            styles['slider-item'],
                            styles[themeSlideClass],
                            classAnimation,
                            classDeleteSlideAnimation
                          )
                        } style={backgroundImageSrc}>
            <div className={styles["slider-content"]}>
              <div className={styles['slider-text']}>
                <h1 className={styles["slider-title"]}>{showingSlide.title}</h1>
                {showingSlide.desc && (
                <div className={styles["slider-desc"]}>{showingSlide.desc}</div>
              )}
              </div>
              <div className={styles["slider-actions"]}>
                <div className={styles['slider-buttons']}>
                  {showingSlide.pathsForActions.map((source, index) =>
                    source.trigger === "route" ? (
                      <ButtonUI
                        key={index}
                        variant={index === 0 ? "filled" : "outlined"}
                        color={colorBtn || (index === 0 ? "primary" : "secondary")}
                        
                        to={source.path}
                      >
                        {source.title}
                      </ButtonUI>
                    ) : (
                      <ButtonUI
                        key={index}
                        variant={index === 0 ? "filled" : "outlined"}
                        color={colorBtn || (index === 0 ? "primary" : "secondary")}
                        onClick={source.callback}
                      >
                        {source.title}
                      </ButtonUI>
                    ),
                  )}
                </div>
                 
              </div>
            
            </div>
          
          </div>)
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

