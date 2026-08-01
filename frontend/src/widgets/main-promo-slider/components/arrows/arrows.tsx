import { ArrowsUI } from "./ui/arrows";
//  поменять 
import {
  useSliderActionsContext,
  useSliderStateContext,
} from "@/features/slider/";
import type { TArrows } from "./types";
import { useMemo } from "react";

type ArrowsProps = {
  themeArrows?:string;
}


export const Arrows = ({themeArrows}:ArrowsProps) => {
  const { isAnimation, isBlockArrow } =
    useSliderStateContext();
  const { handlersForChangeSlide } = useSliderActionsContext();

  const { handleGoNextSlide, handleGoPrevSlide} = handlersForChangeSlide;

  const theme = themeArrows === "light" ? "primary" : "secondary";
 

  const arrows = useMemo<TArrows>(
    () => ({
      right: {
        key: "right",
        onClick: handleGoPrevSlide,
        icon: "arrow-right",
      },
      left: { key: "left", onClick: handleGoNextSlide, icon: "arrow-left" },
    }),
    [handleGoPrevSlide, handleGoNextSlide],
  );
  return (
    //  надо ли мемоизировать компонент?
    <ArrowsUI
      arrows={arrows}
      themeArrows={theme}
      isDisabled={isAnimation}
      isBlockArrow={isBlockArrow}
    />
  );
};
