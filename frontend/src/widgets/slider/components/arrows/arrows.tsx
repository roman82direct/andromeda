// import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useMemo} from "react";
import { ArrowsUI } from "./ui/arrows";
import { useSliderActionsContext, useSliderStateContext } from "../../hooks/useInitialContext";
import type { TArrows } from "./types";

export const Arrows = () => {
  const {currentSlideTheme, isAnimation, isBlockArrow } = useSliderStateContext();
  const { handleChangeSlide, } = useSliderActionsContext();

  const themeArrows = currentSlideTheme === "light" ? "primary" : "secondary";
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
  
  
  
  const arrows = useMemo<TArrows>(()=>({
      right:   {
          key: "right",
           onClick: handleDecrementSlide,
          icon: "arrow-right",
     },
      left: {    key: "left",
      onClick: handleIncrementSlide,
      icon: "arrow-left",
    }
       
  
  }),[handleDecrementSlide, handleIncrementSlide])
  return (
    //  надо ли мемоизировать компонент?
       <ArrowsUI 
          arrows={arrows} 
          themeArrows={themeArrows }
          isDisabled={isAnimation}
          isBlockArrow = {isBlockArrow}
        />
  );
};
