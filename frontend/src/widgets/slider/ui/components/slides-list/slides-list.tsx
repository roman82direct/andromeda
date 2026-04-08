import { SlideUI } from "../slide/slide";
import styles from './slides-list.module.css';
import type React from "react";
import { useContext } from "react";
import { SliderContext } from "@/widgets/slider/utils/contexts";


export const SlidesList = ()=>{

  //  получаем данные из контекста номер слайда для вычисления его положения
  //  относительно translateX и все слайды
  const {slideNumber, slides} = useContext(SliderContext);

  // работает по принципу ленты
  const stylesTranslate = {
    transform: `translateX(-${slideNumber * 100}%)`
  } as React.CSSProperties
  
    return  (

      <div 
          className={styles['slides-list']}
          style={stylesTranslate}
          >

         {
          slides.map((slide,index)=>(
             <SlideUI key={index}   showingSlide={slide}/>
          ))
         }
       
      </div>)
}