import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useContext } from "react";
import type { TArrow } from "@/widgets/slider/types";
import { ArrowsUI } from "./ui/arrows";

export const Arrows = () => {
  const { handleChangeSlide, currentSlideTheme, transitionEnabled } = useContext(SliderContext);
  const themeArrows = currentSlideTheme === "light" ? "primary" : "secondary";
  const handleDecrementSlide = useCallback(() => {
    handleChangeSlide("decrement");
  }, [handleChangeSlide]);
  const handleIncrementSlide = useCallback(() => {
    handleChangeSlide("increment");
  }, [handleChangeSlide]);

  //  подумать надо ли memo
  const arrows: TArrow[] = [
    {
      key: "right",
      onClick: handleDecrementSlide,
      icon: "arrow-right",
    },
    {
      key: "left",
      onClick: handleIncrementSlide,
      icon: "arrow-left",
    },
  ];

  return (
    //  надо ли мемоизировать компонент?
       <ArrowsUI 
          arrows={arrows} 
          themeArrows={themeArrows }
          isDisabled={transitionEnabled}
        />
  );
};
