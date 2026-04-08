
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type {  TSliderUIProps } from "./types";
import  { memo, useCallback, useContext } from 'react';
import { SlidesList } from "./components/slides-list/slides-list";
import { SliderContext } from "../utils/contexts";

export const SliderComponentUI = ({
  onSetIndexSlide,
  onHandleChangeSlide,
  indexesPag,
  toggleIntervalSlide,
}:TSliderUIProps) => {
  //  уберем useContext после создания отдельной навигации с пагинацией и стрелками

  const {slideNumber, slides} = useContext(SliderContext);
  const handleDecrementSlide = useCallback(()=>{
    onHandleChangeSlide('decrement');
  },[onHandleChangeSlide]);
  const handleIncrementSlide = useCallback(()=>{
    onHandleChangeSlide('increment');
  },[onHandleChangeSlide]);

  const handleSetSlide = useCallback((index:number)=>{
     
    return ()=>(onSetIndexSlide(index))
   
  },[onSetIndexSlide])
  
  //  переделать логику темной темы !!!!!!!
    const colorBtn =  slides[1].typeTheme === 'dark' ? 'dark' : '';
       

    return (
      // анимация переключения
// 
      <div  className={styles.slider}  onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)}>
            <SlidesList/>
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
                            onClick={handleSetSlide(index)}
                            iconActiveClass={"ellipse-filled"}
                            iconClass={"ellipse-emptied"}
                            isActive={index === slideNumber}
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

