import { ButtonUI } from "@/shared/ui/button";
import clsx from "clsx";
import styles from "./slide.module.css";
import type { TSlide, TSlideItemWithId } from "@/widgets/slider/types";
import { useMemo } from "react";
//  есть смысл сделать useContext????
//  и все пропсы передавать через Slider => SlideUI
//  пропс какой - только сам слайд ??

export type SlideUIProps = {
  showingSlide: TSlideItemWithId;
  // isAnimation?: boolean;
  // isDeleteAnimation?:boolean;
  isFirstRender?: boolean;
  positionSlide: TSlide;
};

export const SlideUI = ({ showingSlide, positionSlide }: SlideUIProps) => {
  const backgroundImageSrc = useMemo(() => {
    //  защита если картини нет
    if (!showingSlide.image) return {};
    return {
      "--fallback-bg": `url("${showingSlide.image.jpg["1x"]}")`,
      "--slide-bg": `image-set(
          url("${showingSlide.image.avif["1x"]}") 1x,
          url("${showingSlide.image.avif["2x"]}") 2x,
          url("${showingSlide.image.webp["1x"]}") 1x,
          url("${showingSlide.image.webp["2x"]}") 2x,
          url("${showingSlide.image.jpg["1x"]}") 1x,
          url("${showingSlide.image.jpg["2x"]}") 2x
      )`,
    } as React.CSSProperties;
  }, [showingSlide]);

  const themeSlideClass =
    showingSlide.typeTheme === "light" ? "is-light" : "is-dark";
  const colorBtn = showingSlide.typeTheme === "dark" ? "dark" : "";
  const classPosSlide = positionSlide;

  return (
    <article
      className={clsx(
                    styles["slider-item"], 
                    styles[themeSlideClass],
                    styles[classPosSlide]
                  )}
      style={backgroundImageSrc}
    >
      {/* проблема переполнения текста  */}
      <div className={styles["slider-content"]}>
        <div className={styles["slider-text"]}>
          <h1 className={styles["slider-title"]}>{showingSlide.title}</h1>
          {showingSlide.desc && (
            <div className={styles["slider-desc"]}>{showingSlide.desc}</div>
          )}
        </div>
        <div className={styles["slider-actions"]}>
          <div className={styles["slider-buttons"]}>
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
  );
};
