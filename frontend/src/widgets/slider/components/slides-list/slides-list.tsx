import styles from "./slides-list.module.css";
import type React from "react";
// import { useContext } from "react";
// import { SliderContext } from "@/widgets/slider/utils/contexts";
import { 
    useSliderStateContext,
    useSliderActionsContext, 
    useGetSlidesContext
  } from '../../hooks/useInitialContext';
import { useMemo } from "react";

export const SlidesList = () => {
  //  создать ui комопонент с чилдрен - модель универсальной карусели ??
  const { slideNumber, transitionEnabled } =useSliderStateContext();
  const {  handleTransitionEnd } = useSliderActionsContext();
  const { slides, children } = useGetSlidesContext();
  
  
  const stylesTranslate = useMemo(()=>({
    transform: `translateX(-${slideNumber * 100}%)`,
    transition:  transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
  }),[slideNumber, transitionEnabled]) as React.CSSProperties;
//  сделать чилдрен функцию!!!!
//   const renderedSlides = useMemo(()=>{
//     return slides.map((slide, index) => {
//         return <SlideUI key={index} showingSlide={slide} />
// })
//   },[slides])
 

  return (
    <div 
        onTransitionEnd={handleTransitionEnd}
        className={styles["slides-list"]} 
        style={stylesTranslate}>
          {/* здесь просто children */}
      {/* {renderedSlides} */}
      {children(slides)}
    </div>
  );
};
