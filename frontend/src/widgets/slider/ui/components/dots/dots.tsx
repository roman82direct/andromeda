import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useContext } from "react";
import styles from './dots.module.css';
import { IconButtonUI } from "@/shared/ui/icon-button";

export const Dots = ()=>{
  const {
          slideNumber, 
          dotsPag,
          setIndexSlide
        } =useContext(SliderContext);
      // slideNumber -  номер текущего слайда котрый на "экране"
  const handleSetSlide = useCallback((index:number)=>{
        
      return ()=>(setIndexSlide(index))
      
    },[setIndexSlide])

      
  return (
       <ul className={styles["slider-pag"]}>
          {dotsPag.map((indexSlide) => (
            <li key={indexSlide} className={styles["banner-pag-item"]}>
              <IconButtonUI
                onClick={handleSetSlide(indexSlide)}
                iconActiveClass={"ellipse-filled"}
                iconClass={"ellipse-emptied"}
                isActive={indexSlide === slideNumber}
                //  создание  "темы" точек 
                colorIcon={"secondary"}
                sizeIcon={10}
              />
            </li>
          ))}
        </ul>
  )
}