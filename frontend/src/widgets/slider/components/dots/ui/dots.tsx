import type { TThemeElementsPage } from "@/shared/types/types";
import styles from "./dots.module.css";
import { memo, useCallback } from "react";
import clsx from "clsx";

type DotsProps = {
  activeSlideNumber: number;
  dotsPag: number[];
  onClick: (index: number) => void;
  currentDotsTheme?: TThemeElementsPage;
  isBlockClickForDots?: boolean;
};

const DotsUIComponent = ({
  activeSlideNumber,
  dotsPag,
  onClick,
  currentDotsTheme = "primary",
  isBlockClickForDots = false,
}: DotsProps) => {
  
  // Стабильная фабрика обработчиков
  const createHandleClick = useCallback(
    (index: number) => () => onClick(index),
    [onClick]
  );

 

  return (
    <ul className={styles["dots-pag"]}>
      {dotsPag.map((indexSlide) => (
        <li key={indexSlide} className={styles["dot-pag-item"]}>
          {/* <IconButtonUI
            onClick={createHandleClick(indexSlide)}
            iconActiveClass="ellipse-filled"
            iconClass="ellipse-emptied"
            isActive={indexSlide === activeSlideNumber}
            colorIcon={currentDotsTheme}
            sizeIcon={10}
            type="button"
            isDisabled={isBlockClickForDots}
          /> */}
           <button
              onClick={createHandleClick(indexSlide)}
              className={ 
                  clsx(
                        styles['dot'],
                        currentDotsTheme === 'primary' ? styles['primary-dot'] :  styles['secondary-dot'],
                        activeSlideNumber === indexSlide ? styles['active-dot'] : ''
                    )}
              type="button"
              disabled={isBlockClickForDots}
          />
        </li>
      ))}
    </ul>
  );
};

export const DotsUI = memo(DotsUIComponent);
DotsUI.displayName = "DotsUI";