import { ButtonUI } from "@/shared/ui/button";
import clsx from "clsx";
import styles from "./slide.module.css";
import type { TSlideItemWithId } from "@/widgets/slider/types";
import { memo,  } from "react";

export type SlideUIProps = {
  showingSlide: TSlideItemWithId;
};

export const SlideUIComponent = ({ showingSlide }: SlideUIProps) => {
  const backgroundImageSrc = () => {
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
  };

  const themeSlideClass =
    showingSlide.typeTheme === "light" ? "is-light" : "is-dark";
  const colorBtn = showingSlide.typeTheme === "dark" ? "dark" : "";


  return (
    <article
      className={clsx(
                    styles["slider-item"], 
                    styles[themeSlideClass],

                  )}
      style={backgroundImageSrc()}
    >
      {/* проблема переполнения текста  */}
      <div className={styles["slider-content"]}>
        <div className={styles["slider-text"]}>
          <h3 
              title={showingSlide.title}
              className={clsx(
                          styles["slider-title"],
                          // оставить наслучай переполнения текста ?
                          styles['clamp']
                        )
                        }>{showingSlide.title}</h3>
          {showingSlide.desc && (
            <div className={clsx(
                              styles["slider-desc"],
            // оставить наслучай переполнения текста ?
                              styles['clamp']
                            )}>{showingSlide.desc}</div>
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


export const SlideUI= memo(SlideUIComponent);

SlideUI.displayName = "SlideUI";
