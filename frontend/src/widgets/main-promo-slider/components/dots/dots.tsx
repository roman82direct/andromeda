import { useCallback } from "react";
import { DotsUI } from "./ui/dots";
import {
  useSliderActionsContext,
  useSliderStateContext,
} from "@/features/slider/";
import type { ThemeSlide } from "../../types";


type DotsProps = {
  themeDots?:  ThemeSlide;
}


export const Dots = ({themeDots}:DotsProps) => {
  const {
    slideNumber,
    dotsPag,
    // тема слайда влияет на тему отображения точек пагинации на фоне слайда
    isAnimation,
  } = useSliderStateContext();

  //  нужен контекст чтобы получить тек тему слайда

  const { setIndexSlide } = useSliderActionsContext();

  const dotsLength = dotsPag.length - 1;

  // console.log(slideNumber)
  // slideNumber -  номер текущего слайда котрый на "экране"
  const handleSetSlide = useCallback(
    (index: number) => {
      setIndexSlide(index);
    },
    [setIndexSlide],
  );
  // на основе текущего слайда (его фона) определим тему точек
  const theme = themeDots === "light" ? "primary" : "secondary";
  //  т к мы используем клоны для анимации бесконечного слайдера, "обманим" пагинацию

  return (
    <DotsUI
      activeSlideNumber={slideNumber}
      dotsPag={dotsLength > 0 ? dotsPag : [1, 2, 3]}
      currentDotsTheme={theme}
      onClick={handleSetSlide}
      isBlockClickForDots={isAnimation}
    />
  );
};
