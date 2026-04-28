import { SliderContext } from "@/widgets/slider/utils/contexts";
import { useCallback, useContext } from "react";
import { DotsUI } from "./ui/dots";

export const Dots = () => {
  const {
    slideNumber,
    dotsPag,
    setIndexSlide,
    // тема слайда влияет на тему отображения точек пагинации на фоне слайда
    currentSlideTheme,
    transitionEnabled
    
  } = useContext(SliderContext);

  // console.log(dotsPag)
  
  // console.log(slideNumber)
  // slideNumber -  номер текущего слайда котрый на "экране"
  const handleSetSlide = useCallback(
    
    (index: number) => {
      setIndexSlide(index);
      console.log(index)
    },
    [setIndexSlide],
  );
  // на основе текущего слайда (его фона) определим тему точек
  const themePag = currentSlideTheme === "light" ? "primary" : "secondary";
  //  т к мы используем клоны для анимации бесконечного слайдера, "обманим" пагинацию
 
  return (
       <DotsUI 
            activeSlideNumber={slideNumber} 
            dotsPag={dotsPag}  
            currentDotsTheme={themePag} 
            onClick={handleSetSlide}
            isBlockClickForDots={transitionEnabled}
        />
  );
};
