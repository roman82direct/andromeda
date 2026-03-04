import { ButtonUI } from "@/shared/ui/button";
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from './slider.module.css';
import type { FC } from "react";
import type { TSliderUIProps } from "./types";

export const SliderUI:FC<TSliderUIProps> = ({
  indexShowSlide,
  showingSlide,
  onSetIndexSlide, 
  onHandleChangeSlide,
  indexesPag
})=>{
    return (
        <div>
       
          <div className={styles.slider}>
           
            {<div className={styles['slider-item']}>
              <img className={styles['slider-image']} src={showingSlide.image} alt={`Акция:${showingSlide.title}`} />
              <div className={styles['slider-content']}>
                <h1 className={styles['slider-title']}>{showingSlide.title}</h1>
                {showingSlide.desc && <div className={styles['slider-text']}>{showingSlide.desc}</div>}
                  <div className={styles['slider-actions']}>
                  {showingSlide.pathsForActions.map((source,index)=>(
                     source.trigger === 'route' ? <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  to={source.path}>{source.title}</ButtonUI>
                     : <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  onClick={source.callback}>{source.title}</ButtonUI>
                  ))
                  }
                </div>
               </div>
            </div>}
          </div>
          <div className={styles['slider-nav']}>
              <div className={styles['slider-arrows']}>
                <IconButtonUI onClick={()=>onHandleChangeSlide('decrement')}iconClass={'arrow-right'} isActive={false} colorIcon={'primary'}/>
                <IconButtonUI  onClick={()=>onHandleChangeSlide('increment')}iconClass={'arrow-left'} isActive={false} colorIcon={'primary'}/>
              </div>
              <ul className={styles['slider-pag']}>
                { indexesPag.map((index)=>(
                   <li key={index} className={styles['banner-pag-item']}>
                    <IconButtonUI onClick={()=>{onSetIndexSlide(index)}} iconActiveClass={'ellipse-filled'} iconClass={'ellipse-emptied'} isActive={index===indexShowSlide} colorIcon={'primary'}/>
                  </li>
                ))
                }
              </ul>
            </div>
      </div>
          
     
      
    
  );
};
