import { useCallback, useMemo } from "react";
import { ArrowsUI } from "./ui/arrows";
//  поменять 
import {
  useSliderActionsContext,
  useSliderStateContext,
} from "@/features/slider/";
import type { TArrows } from "./types";

type ArrowsProps = {
  themeArrows?:string;
}


export const Arrows = ({themeArrows}:ArrowsProps) => {
  const { isAnimation, isBlockArrow } =
    useSliderStateContext();
  const { handleChangeSlide } = useSliderActionsContext();

  const theme = themeArrows === "light" ? "primary" : "secondary";
  const handleDecrementSlide = useCallback(() => {
    handleChangeSlide("decrement");
  }, [handleChangeSlide]);
  const handleIncrementSlide = useCallback(() => {
    handleChangeSlide("increment");
  }, [handleChangeSlide]);

  //  подумать надо ли memo
  // const arrows  = useMemo<TArrow[]>(()=>[
  //   {
  //     key: "right",
  //     onClick: handleDecrementSlide,
  //     icon: "arrow-right",
  //   },
  //   {
  //     key: "left",
  //     onClick: handleIncrementSlide,
  //     icon: "arrow-left",
  //   },
  // ],[handleDecrementSlide, handleIncrementSlide]);

  const arrows = useMemo<TArrows>(
    () => ({
      right: {
        key: "right",
        onClick: handleDecrementSlide,
        icon: "arrow-right",
      },
      left: { key: "left", onClick: handleIncrementSlide, icon: "arrow-left" },
    }),
    [handleDecrementSlide, handleIncrementSlide],
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
