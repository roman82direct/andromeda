// import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useMemo} from "react";
import type { TArrow } from "@/widgets/slider/types";
import { ArrowsUI } from "./ui/arrows";
import { useSliderActionsContext, useSliderStateContext } from "../../hooks/useInitialContext";

export const Arrows = () => {
  const {currentSlideTheme, isAnimation } = useSliderStateContext();
  const { handleChangeSlide, } = useSliderActionsContext();

  const themeArrows = currentSlideTheme === "light" ? "primary" : "secondary";
  const handleDecrementSlide = useCallback(() => {
    handleChangeSlide("decrement");
  }, [handleChangeSlide]);
  const handleIncrementSlide = useCallback(() => {
    handleChangeSlide("increment");
  }, [handleChangeSlide]);

  //  подумать надо ли memo
  const arrows  = useMemo<TArrow[]>(()=>[
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
  ],[handleDecrementSlide, handleIncrementSlide]);

  return (
    //  надо ли мемоизировать компонент?
       <ArrowsUI 
          arrows={arrows} 
          themeArrows={themeArrows }
          isDisabled={isAnimation}
        />
  );
};
