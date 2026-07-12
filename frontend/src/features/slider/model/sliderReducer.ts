import {     type TSliderAction, SliderActionTypes } from "../types";
import { getNextIndexSlide } from '../utils/getIndexNextSlide';

// опишем состояние
export type TSliderState<T> = {
  indexSlide: number;
  isAnimating: boolean; // общий процесса анимации(для блокировки кнопок)
  transitionEnabled: boolean; //состояние перехода слайдов
  preparedSlides: T[];
  isAutoPlay: boolean;
};
//  определим начальное состояние слайдера
//  для этого сделаем фабрику(чтобы можно передать параметром тип)
export const createInitialStateSlider =  <T>(): TSliderState<T> => (
  {
    indexSlide: 0,
    isAnimating: false,
    transitionEnabled: true,
    preparedSlides: [],
    isAutoPlay: true,
  }
)




// напишем редюсер для слайдера
export const sliderReducer = <T>(
  state: TSliderState<T>,
  action: TSliderAction<T>,
): TSliderState<T> => {
  switch (action.type) {
    case SliderActionTypes.changeSlide: {
      // пока идет анимация мы не можем сменить слайд еще раз
      if (state.isAnimating) return state;
      const nextIndexSlide = getNextIndexSlide({
        typeOperation: action.payload,
        prevIndex: state.indexSlide,
        ArrSizeSlides: state.preparedSlides.length,
      });
      return {
        ...state,
        indexSlide: nextIndexSlide,
        isAnimating: true,
        transitionEnabled: true,
      };
    }
    case SliderActionTypes.transitionEnd: {
      if (action.payload) {
        let defaultTransitionValue = state.transitionEnabled;

        const currentIndex = state.indexSlide;
        let nextIndexSlide = currentIndex;
        if (currentIndex === 0) {
          // если нулевой клон переходим к его настоящ(послед слайд)
          //  или минус 2
          nextIndexSlide = state.preparedSlides.length - 2; // оригинальный последний
          defaultTransitionValue = false;
        }
        if (currentIndex === state.preparedSlides.length - 1) {
          nextIndexSlide = 1;
          defaultTransitionValue = false;
        }

        return {
          ...state,
          indexSlide: nextIndexSlide,
          isAnimating: false,
          transitionEnabled: defaultTransitionValue,
        };
      }
      return {
        ...state,
        indexSlide: state.indexSlide,
        isAnimating: false,
        transitionEnabled: state.transitionEnabled,
      };
    }
    case SliderActionTypes.setIndex: {
      return {
        ...state,
        indexSlide: action.payload,
        isAnimating: false,
        transitionEnabled: true,
      };
    }
    case SliderActionTypes.setPreparedSlides: {
      return {
        ...state,
        preparedSlides: action.payload,
      };
    }
    case SliderActionTypes.toggleAutoPlay: {
      return {
        ...state,
        isAutoPlay: action.payload,
      };
    }

    default:
      return state;
  }
};
