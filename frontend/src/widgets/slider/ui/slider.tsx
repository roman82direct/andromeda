import { ButtonUI } from "@/shared/ui/button";
import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./slider.module.css";
import type { FC } from "react";
import type { TSliderUIProps } from "./types";
import clsx from "clsx";

export const SliderUI: FC<TSliderUIProps> = ({
  indexShowSlide,
  showingSlide,
  onSetIndexSlide,
  onHandleChangeSlide,
  indexesPag,
  toggleIntervalSlide
}) => {
    const backgroundImageSrc = {
      '--slide-bg': `url("${showingSlide.image}")`
    } as React.CSSProperties
  return (
    
      <div className={styles.slider} onMouseEnter={()=> toggleIntervalSlide(false)} onMouseLeave={()=> toggleIntervalSlide(true)} >
        {
          <div className={styles["slider-item"]} style={backgroundImageSrc}>
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
                        color={index === 0 ? "primary" : "secondary"}
                        to={source.path}
                      >
                        {source.title}
                      </ButtonUI>
                    ) : (
                      <ButtonUI
                        key={index}
                        variant={index === 0 ? "filled" : "outlined"}
                        color={index === 0 ? "primary" : "secondary"}
                        onClick={source.callback}
                      >
                        {source.title}
                      </ButtonUI>
                    ),
                  )}
                </div>
                 
              </div>
            
            </div>
             <div className={styles["slider-nav"]}>
                    <div className={styles["slider-arrows"]}>
                      <IconButtonUI
                        onClick={() => onHandleChangeSlide("decrement")}
                        iconClass={"arrow-right"}
                        isActive={false}
                        colorIcon={"primary"}
                        sizeIcon={33}
                      />
                      <IconButtonUI
                        onClick={() => onHandleChangeSlide("increment")}
                        iconClass={"arrow-left"}
                        isActive={false}
                        colorIcon={"primary"}
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
                            colorIcon={"primary"}
                            sizeIcon={10}
                          />
                        </li>
                      ))}
                    </ul>
              </div>
          </div>
        }
      </div>
      
 
  );
};
