import { ButtonUI } from "@/shared/ui/button";
import clsx from "clsx";
import styles from './slide.module.css';
import type { TSlideItem } from "@/shared/types/ui/slider";
import { useMemo } from "react";
//  есть смысл сделать useContext????
//  и все пропсы передавать через Slider => SlideUI
//  пропс какой - только сам слайд ??

export type SlideUIProps = {
  showingSlide: TSlideItem;
  isAnimation?: boolean;
  isDeleteAnimation?:boolean;
}

export const SlideUI = ({
  showingSlide,
  isAnimation,
  isDeleteAnimation
}:SlideUIProps)=>{
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
  ),[showingSlide]);
   const themeSlideClass = showingSlide.typeTheme === 'light' ? 'is-light' : 'is-dark';
    const colorBtn =  showingSlide.typeTheme === 'dark' ? 'dark' : '';
    // переделать работу с классами
    const classAnimation =   isAnimation ? 'slider-item-appeared' : '';
    const classDeleteSlideAnimation =  isDeleteAnimation ? 'slider-item-disappeared' : '';
  console.log(isDeleteAnimation)
    return (
     <article className={
                          clsx(
                            styles['slider-item'],
                            styles[themeSlideClass],
                            //  чтобы класс удалялся 
                             styles[classAnimation],
                              styles[classDeleteSlideAnimation]
                          )
                        } style={backgroundImageSrc}>
                 {/* проблема переполнения текста  */}
              {/* повесить фонофое зображение сюда  и сделать анимацию для него */}
              {/* сделать соседа который будет кот будет сменять слайд и подгружать - предыдущий или следующий */}
              {/* по ум он будет скрыт но как только мы нажимаем на смену слайда тек слайд меняется на соседа  */}
              {/* [1 visible,2 invisible] forward => [2 visible,3 invisible] */}
              {/* [ 2 visible,1 invisible] back => [1 visible,2 invisible] */}
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
            
          </article>
  )
}