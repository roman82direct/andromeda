import { SlideUI } from "../slide/slide";
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
  const { slides } = useGetSlidesContext();
  
  
  const stylesTranslate = useMemo(()=>({
    transform: `translate3d(-${slideNumber * 100}%,0,0)`,
    transition:  transitionEnabled ? 'transform 0.8s ease-in-out' : 'none',
    willChange: 'transform'
  }),[slideNumber, transitionEnabled]) as React.CSSProperties;

  const renderedSlides = useMemo(()=>{
    return slides.map((slide, index) => {
        return <SlideUI key={index} showingSlide={slide} />
})
  },[slides])
 

  return (
    <div 
        onTransitionEnd={handleTransitionEnd}
        className={styles["slides-list"]} 
        style={stylesTranslate}>
          {/* здесь просто children */}
      {renderedSlides}
    </div>
  );
};
