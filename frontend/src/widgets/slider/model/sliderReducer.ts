
import type { TActionSlide, TSlideItem } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";


// опишем состояние
export type TSliderState = {
  indexSlide: number;
  isAnimating: boolean; // общий процесса анимации(для блокировки кнопок)
  transitionEnabled: boolean; //состояние перехода слайдов
  preparedSlides: TSlideItem[];
}
//  определим начальное состояние слайдера
export const initialStateSlider: TSliderState  ={
  //  текущий слайд который будем показывать
  indexSlide: 1,
  isAnimating: false,
  transitionEnabled: true,
  preparedSlides: [],
}

// опишем действия 
export type TSliderAction = 
| {
    type: 'CHANGE_SLIDE'; payload:TActionSlide;
  }
| {
    type: 'TRANSITION_END';
  }
| {
  type: 'SET_INDEX'; payload:number;
} 
| {type: 'SET_PREPARED_SLIDES'; payload:  TSlideItem[]}




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
      case 'TRANSITION_END': {

        let defaultTransitionValue = state.transitionEnabled;

        const currentIndex = state.indexSlide;
        let nextIndexSlide = currentIndex;
        if(currentIndex === 0){
         
          // если нулевой клон переходим к его настоящ(послед слайд)
          //  или минус 2
          nextIndexSlide = state.preparedSlides.length - 2; // оригинальный последний
          defaultTransitionValue = false; 
        }
        if(currentIndex === state.preparedSlides.length-1){
         
          nextIndexSlide = 1
          defaultTransitionValue = false;
        }

        return {
          ...state,
          indexSlide: nextIndexSlide,
          isAnimating: false,
          transitionEnabled:defaultTransitionValue,
          
        }
      };
      case 'SET_INDEX':{
        return {
          ...state,
          indexSlide: action.payload,
          isAnimating: false,
          transitionEnabled: true,
        }
      };
      case 'SET_PREPARED_SLIDES': {
        return {
          ...state,
          preparedSlides: action.payload,
        }
      }
      default:
        return state
    }
}