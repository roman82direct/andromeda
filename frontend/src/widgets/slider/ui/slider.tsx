
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type {  TSliderUIProps } from "./types";
import  { memo, useCallback } from 'react';
import { SlideUI } from "./components/slide/slide"; 

export const SliderComponentUI = ({
  isAnimation,
  isDeleteAnimation,
  indexShowSlide,
  showingSlide,
  nextSlide,
  onSetIndexSlide,
  onHandleChangeSlide,
  indexesPag,
  toggleIntervalSlide,
  prevSlide,
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
  
    // console.log(showingSlide)
    // мемоизация кнопок и вынос сложной логики с мемоизацией
    // для стилизации слайда и его элементов если темный фон или светлый чтобы с текстом не сливались
    // const themeSlideClass = showingSlide.typeTheme === 'light' ? 'is-light' : 'is-dark';
    const colorBtn =  showingSlide.typeTheme === 'dark' ? 'dark' : '';
    // const classAnimation =   isAnimation ? styles['slider-item-appeared'] : '';
    // const classDeleteSlideAnimation =  isDeleteAnimation ? styles['slider-item-disappeared'] : ''
    console.log("showingSlide:", showingSlide)
    return (

      <div  className={styles.slider} onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)} >
        
        <div className={styles.slides}>
          {/* надо разобрать как удалять классы и добавляять для анимации чтобы избежать лишних реднеров  */}
      
{/* неправильно работаюбт классы анимации */}
{/*  cделать map массив их трех слайдов вместо пропсов из трех слайдов */}
            <SlideUI  key={prevSlide.id} typeSlide={'prev'}  showingSlide={prevSlide}  isDeleteAnimation={isDeleteAnimation}/>
          
            <SlideUI key={showingSlide.id} typeSlide={'current'}  showingSlide={showingSlide} isAnimation={isAnimation} />
            
            <SlideUI key={nextSlide.id} typeSlide={'next'}  showingSlide={nextSlide}  isDeleteAnimation={isDeleteAnimation} />

        </div>
         
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

