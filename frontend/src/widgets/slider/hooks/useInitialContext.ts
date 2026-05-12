
import { useContext } from "react";
import {
  SliderStateContext,
  SliderActionsContext,
  SlidesContext
} from '../utils/contexts';

// возможно объединить
export const useSliderStateContext = ()=>{
    const contextState = useContext(SliderStateContext);
    if(!contextState) {
      throw new Error("useSliderState must be used inside Provider")
    }
    return contextState
}

export const useSliderActionsContext = ()=>{
  const contextActions = useContext( SliderActionsContext)
   if(!contextActions) {
      throw new Error("useSliderState must be used inside Provider")
    }
    return contextActions
}

export const useGetSlidesContext = ()=>{
  const contextSlides = useContext(SlidesContext);
  if(!contextSlides){
    throw new Error("useGetSlidesContext must be used inside Provider")
  }
  return contextSlides
}