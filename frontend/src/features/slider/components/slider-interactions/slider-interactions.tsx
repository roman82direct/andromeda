import { type ReactNode } from "react"
import { useSliderInteractions } from "../../hooks/useSliderInteraction";



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
}




export const SliderInteractions = ({
  children,
  autoPlayParams,
}:SliderInteractionsProps)=>{


  const {
    onPointerEnter, 
    onPointerLeave, 
    onPointerUp,  
    onPointerDown,
    onPointerCancel,
    onPointerMove
  } = useSliderInteractions({
    enabled: autoPlayParams.enabledAutoPlay,
    pauseAutoPlay: autoPlayParams.runAutoPlay,
    resumeAutoPlay:  autoPlayParams.stopAutoPlay,
    forwardCallback: ()=> autoPlayParams.goNextSlide(),
    backCallback: ()=> autoPlayParams.goPrevSlide(),
  })


  return (<div
               //  тач прикосновение
            onPointerDown={onPointerDown}
            onPointerUp = {onPointerUp}
            // работа с мышкой границы
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerCancel={onPointerCancel}
            //  перелистывание пальцем свайпы
            onPointerMove={onPointerMove}
          >
            {
              children
            }
          </div>)
}