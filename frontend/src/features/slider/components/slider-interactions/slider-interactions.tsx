import { type ReactNode } from "react";
import { useSliderInteractions } from "../../hooks/useSliderInteraction";
import styles from "./slider-interactions.module.css";

type TCalback = () => void;

type SliderInteractionsProps = {
  children: ReactNode;
  autoPlayParams: {
    enabledAutoPlay: boolean;
    stopAutoPlay: TCalback;
    runAutoPlay: TCalback;
    goNextSlide: TCalback;
    goPrevSlide: TCalback;
  };
};

export const SliderInteractions = ({
  children,
  autoPlayParams,
}: SliderInteractionsProps) => {
  const {
    onPointerEnter,
    onPointerLeave,
    onPointerUp,
    onPointerDown,
    onPointerCancel,
  } = useSliderInteractions({
    enabled: autoPlayParams.enabledAutoPlay,
    pauseAutoPlay: autoPlayParams.stopAutoPlay,
    resumeAutoPlay: autoPlayParams.runAutoPlay,
    forwardCallback: () => autoPlayParams.goNextSlide(),
    backCallback: () => autoPlayParams.goPrevSlide(),
  });

  return (
    <div
      className={styles["slider-container"]}
      //  тач прикосновение = нажал или прикоснулся
      onPointerDown={onPointerDown}
      //  оторвал палец или мышку от экрана
      onPointerUp={onPointerUp}
      // работа с мышкой границы
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      //  перелистывание пальцем свайпы
      // onPointerMove={onPointerMove}
    >
      {children}
    </div>
  );
};
