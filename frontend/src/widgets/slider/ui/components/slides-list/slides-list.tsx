import type {  TSlideItemWithId } from "@/widgets/slider/types";
import { SlideUI } from "../slide/slide";
import styles from './slides-list.module.css';
import type React from "react";


type TSlidesListProps = {
  slides: TSlideItemWithId[];
  slideNumber: number;
}

export const SlidesList = ({slides, slideNumber}:TSlidesListProps)=>{

  //  cделать передачу пропсов через useContext

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
             <SlideUI key={index}   showingSlide={slide}  />
          ))
         }
       
      </div>)
}