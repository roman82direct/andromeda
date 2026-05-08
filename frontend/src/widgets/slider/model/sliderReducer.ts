import { useReducer, useMemo, useCallback } from "react";
import type { TActionSlide, TSlideItem } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";
import { getPagIndexes } from "../utils/getPagIndexes";

// опишем состояние
type TSliderState = {
  indexSlide: number;
  isAnimating: boolean; // общий процесса анимации(для блокировки кнопок)
  transitionEnabled: boolean; //состояние перехода слайдов
  preparedSlides: TSlideItem[];
  preparedIndexesForPag: number[];
}

// опишем действия
type TSliderAction = 
| {
    type: 'CHANGE_SLIDE'; payload:TActionSlide
  }
| {
    type: ''
  }
// напишем редюсер
export const sliderReducer = (
  state:TSliderState,
  action: TSliderAction):TSliderState => {
    switch(action.type){
      case 'CHANGE_SLIDE': {
        // пока идет анимация мы не можем сменить слайд еще раз
        if(state.isAnimating) return state;
        const nextIndexSlide = getNextIndexSlide(
          {
            typeOperation:action.payload,
            prevIndex: state.indexSlide,
            ArrSizeSlides: state.preparedSlides.length
          }
        )
        return {
          ...state,
          indexSlide:nextIndexSlide,
          isAnimating: true,
          transitionEnabled:true
        }

      };
      default:
        return state
    }
}