
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type {  TSliderUIProps } from "./types";
import  { memo, useCallback } from 'react';
import { SlidesList } from "./components/slides-list/slides-list";

export const SliderComponentUI = ({
  indexShowSlide,
  slides,
  onSetIndexSlide,
  onHandleChangeSlide,
  indexesPag,
  // toggleIntervalSlide,
  
  // isFirstRender
}:TSliderUIProps) => {


  const handleDecrementSlide = useCallback(()=>{
    onHandleChangeSlide('decrement');
  },[onHandleChangeSlide]);
  const handleIncrementSlide = useCallback(()=>{
    onHandleChangeSlide('increment');
  },[onHandleChangeSlide]);

  const handleSetSlide = useCallback((index:number)=>{
     onSetIndexSlide(index)
  },[onSetIndexSlide])
  
  //  переделать логику темной темы
    const colorBtn =  slides[1].typeTheme === 'dark' ? 'dark' : '';
   
    return (
      // анимация переключения
// onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)}
      <div  className={styles.slider}  >
            <SlidesList slides={slides} slideNumber={indexShowSlide}/>
        {/* <div className={styles['slides-list']}>

          <SlideUI key={showingSlide.id} typeSlide={'current'}  showingSlide={showingSlide} isAnimation={isAnimation} />
          <SlideUI key={nextSlide.id} typeSlide={'next'}  showingSlide={nextSlide}  isDeleteAnimation={isDeleteAnimation} />
          <SlideUI  key={prevSlide.id} typeSlide={'prev'}  showingSlide={prevSlide}  isDeleteAnimation={isDeleteAnimation}/>

        </div> */}
         {/*  сделать отдельно компоненты пагинации и стрелок */}
             <div className={styles["slider-nav"]}>
                    <div className={styles["slider-arrows"]}>
                      <IconButtonUI
                        key={'arrow-right'}
                        onClick={handleDecrementSlide}
                        iconClass={"arrow-right"}
                        isActive={false}
                        colorIcon={colorBtn ? "secondary" : "primary"}
                        sizeIcon={33}
                      />
                      <IconButtonUI
                        key={'arrow-left'}
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
                              // описать прев состояние чтобы работал переход
                              handleSetSlide(index);
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

