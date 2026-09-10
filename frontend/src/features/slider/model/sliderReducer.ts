import { type TSliderAction, SliderActionTypes } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";

// опишем состояние
export type TSliderState<T> = {
  indexSlide: number; // тек индекс слайда
  isAnimating: boolean; // общий процесса анимации(для блокировки кнопок)
  transitionEnabled: boolean; //состояние перехода слайдов
  preparedSlides: T[];
  isAutoPlay: boolean;
  // lengthTrueElements: number;
  lengthTrueSlides: number,
  isRepeating: boolean,
};
//  определим начальное состояние слайдера
//  для этого сделаем фабрику(чтобы можно передать параметром тип)
export const createInitialStateSlider = <T>(): TSliderState<T> => ({
  indexSlide: 0,
  isAnimating: false,
  transitionEnabled: true,
  preparedSlides: [],
  isAutoPlay: true,
  lengthTrueSlides: 0,
  isRepeating: false
});

// напишем редюсер для слайдера
export const sliderReducer = <T>(
  state: TSliderState<T>,
  action: TSliderAction<T>,
): TSliderState<T> => {
  switch (action.type) {
    // флаг повторения( если нужен бесконечный слайдер 
    // и кол-вослайдов больше чем места на экране)
    case SliderActionTypes.setIsRepeating: {
      return {
        ...state,
        isRepeating: action.payload
      }
    }
    // установим длину настоящих слайдов (необходимо для бесконеч цикла)
    case SliderActionTypes.setTrueLengthSlides: {
      return {
        ...state,
          lengthTrueSlides: action.payload
      }
    }
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
    //  css анимация перехода
    // setTransitionEnabled исправить название
    case SliderActionTypes.setTransitionEnabled: {
     
      return {
        ...state,
        transitionEnabled: action.payload,

      };
    }
    case SliderActionTypes.setIndex: {
      return {
        ...state,
        indexSlide: action.payload,
        isAnimating: false,
        // transitionEnabled: true,
      };
    }
    case SliderActionTypes.setPreparedSlides: {
      return {
        ...state,
        preparedSlides: action.payload,
      };
    }
    case SliderActionTypes.toggleAutoPlay: {
      //  если состояние такое же не создаем новый объект нашего состояния
      if(action.payload === state.isAutoPlay) {
        return state
      }
      return {
        ...state,
        isAutoPlay: action.payload,
      };
    }

    default:
      return state;
  }
};
