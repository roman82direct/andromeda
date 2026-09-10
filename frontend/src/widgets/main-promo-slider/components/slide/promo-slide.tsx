import { ButtonUI } from "@/shared/ui/button";
import clsx from "clsx";
import styles from "./promo-slide.module.css";
import type { TPromoSlideItem } from "@/widgets/main-promo-slider/types";
import { memo, useMemo } from "react";

export type PromoSlideUIProps = {
  showingSlide: TPromoSlideItem;
};
//  переделеть названия компонента !!!
export const PromoSlideUIComponent = ({ showingSlide }: PromoSlideUIProps) => {
  const backgroundImageSrc = useMemo<React.CSSProperties>(() => {
    //  защита если картини нет
    console.log(showingSlide)
    if (!showingSlide.image) return {};
    return {
      "--fallback-bg": `url("${showingSlide.image.jpg["1x"]}")`,
      "--slide-bg": `image-set(
          url("${showingSlide.image?.avif?.["1x"]}") 1x,
          url("${showingSlide.image?.avif?.["2x"]}") 2x,
          url("${showingSlide.image?.webp?.["1x"]}") 1x,
          url("${showingSlide.image?.webp?.["2x"]}") 2x,
          url("${showingSlide.image?.jpg?.["1x"]}") 1x,
          url("${showingSlide.image?.jpg?.["2x"]}") 2x
      )`,
    } as React.CSSProperties;
  }, [showingSlide]);

  const themeSlideClass =
    showingSlide.typeTheme === "light" ? "is-light" : "is-dark";
  const colorBtn = showingSlide.typeTheme === "dark" ? "dark" : "";

  return (
    <article
      className={clsx(styles["promo-slide-item"], styles[themeSlideClass])}
      style={backgroundImageSrc}
    >
      {/* проблема переполнения текста  */}
      <div className={styles["promo-slide-content"]}>
        <div className={styles["promo-slide-text"]}>
          <h3
            title={showingSlide.title}
            className={clsx(
              styles["promo-slide-title"],
              // оставить наслучай переполнения текста ?
              styles["clamp"],
            )}
          >
            {showingSlide.title}
          </h3>
          {showingSlide.desc && (
            <div
              className={clsx(
                styles["promo-slide-desc"],
                // оставить наслучай переполнения текста ?
                styles["clamp"],
              )}
            >
              {showingSlide.desc}
            </div>
          )}
        </div>
        <div className={styles["promo-slider-actions"]}>
          <div className={styles["promo-slider-buttons"]}>
            {
              
            showingSlide.pathsForActions.map((source, index) =>
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

export const PromoSlideUI = memo(PromoSlideUIComponent);

PromoSlideUI.displayName = "PromoSlideUI";
