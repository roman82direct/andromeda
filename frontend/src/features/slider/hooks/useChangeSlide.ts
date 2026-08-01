import { SliderActionTypes, type ChangeSlideSettings } from "../types";
import { useCallback, useMemo, useReducer, useEffect } from "react";
import type { TypeOperationFlip } from "../types";
import { getPagIndexes } from "../utils/getPagIndexes";
import {
  createInitialStateSlider,
  sliderReducer,
} from "../model/sliderReducer";
import { useAutoPlayShowSlides } from "./useAutoPlayShowSlides";

// набросать событие onTouch по слайдам для мобилок ?
export const useChangeSlide = <T>(
  slides: T[],
  {
    autoPlay,
    autoPlayTime,
    pagePaginationSize,
    infiniteLoop,
  }: ChangeSlideSettings,
) => {
  // 1. Подготавливаем слайды с клонами
  // (абстрагировать логику клонирования - допустим если нам это не надо)
  const preparedSlides = useMemo(() => {
    if (slides.length === 0) return slides;
    if (infiniteLoop) {
      return [slides[slides.length - 1], ...slides, slides[0]];
    } else {
      return slides;
    }
  }, [infiniteLoop, slides]);

  const [stateSlider, dispatch] = useReducer(
    sliderReducer,
    // на основе 2 обхектаинициализируем состояние
    preparedSlides,
    // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
    (slides: T[]) => {
      //  создадим изначальное состояние слайдера
      const initialStateSlider = createInitialStateSlider<T>();

      const currentIndexSlide = infiniteLoop
        ? initialStateSlider.indexSlide + 1
        : initialStateSlider.indexSlide;
      return {
        ...initialStateSlider,
        indexSlide: currentIndexSlide,
        preparedSlides: slides,
      };
    },
  );

  //  обновление слайдов(напр если они пришли с сервера снова)
  useEffect(() => {
    dispatch({
      type: SliderActionTypes.setPreparedSlides,
      payload: preparedSlides,
    });
  }, [preparedSlides]);

  // если слайдер не бесконечный скрывам стрелку  если слайд первый или последний
  const isRightArrow = !infiniteLoop && stateSlider.indexSlide === 0;
  const isLeftArrow =
    !infiniteLoop &&
    stateSlider.indexSlide === stateSlider.preparedSlides.length - 1;
  const isBlockArrow = {
    isLeftArrow,
    isRightArrow,
  };
  // определим пагинацию

  const preparedIndexesForPag = useMemo(() => {
    const currentIndexesPag = getPagIndexes(
      // бесконеч цикл это лишний первый или последний слайд
      // поэтому подстраиваем совпадение пагинации
      infiniteLoop ? stateSlider.indexSlide - 1 : stateSlider.indexSlide,
      pagePaginationSize || 3,
      slides.length,
    );
    return currentIndexesPag.map((dotIndex) =>
      infiniteLoop ? dotIndex + 1 : dotIndex,
    );
  }, [stateSlider.indexSlide, slides.length, pagePaginationSize, infiniteLoop]);

  //  отключить/включить автоматическое изменение картинок слайдера
  //  подготовка слайдов ксозданию 'бесконечной прокрутки'
  const handleChangeSlide = useCallback((typeOperation: TypeOperationFlip) => {
    dispatch({ type: SliderActionTypes.changeSlide, payload: typeOperation });
  }, []);

  const handleGoNextSlide = useCallback(() => {
      handleChangeSlide('increment')
  }, [handleChangeSlide]);

  const handleGoPrevSlide = useCallback(() => {
      handleChangeSlide('decrement')
  }, [handleChangeSlide]);

  const handleTransitionEnd = useCallback(() => {
    // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
    dispatch({
      type: SliderActionTypes.transitionEnd,
      payload: infiniteLoop || false,
    });
  }, [infiniteLoop]);

  //  можем сменить слайд на тот который нам нужно
  const setIndexSlide = useCallback((indexSlide: number) => {
    dispatch({ type: SliderActionTypes.setIndex, payload: indexSlide });
  }, []);

  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  обработчик для onMouseOn onMouseEnter
  //  useCallback 
  const handleToggleRunAutoPlayShowSlides = useCallback((isPause: boolean) => {
    // console.log(stateSlader)
    
    dispatch({
      type: SliderActionTypes.toggleAutoPlay,
      payload: !isPause, // Если пауза (true), то автоплей станет false (выключен)
    });
    
  },[]);
  //  работа автопоказа слайдов
  useAutoPlayShowSlides<T>({
    indexSlide: stateSlider.indexSlide,
    infiniteLoop,
    autoPlay,
    slidesArrLength: stateSlider.preparedSlides.length,
    autoPlayTime,
    isAutoPlayState: stateSlider.isAutoPlay,
    dispatch,
  });

  return {
    indexSlide: stateSlider.indexSlide, // индексы:слайд текущий
    setIndexSlide, // для прыжка на люб слайд (пагинация)
  
    preparedSlides: stateSlider.preparedSlides,
    isAnimating: stateSlider.isAnimating,
    transitionEnabled: stateSlider.transitionEnabled,
    handleTransitionEnd,
    preparedIndexesForPag,
    // для автом смены слайда - можно тоже абстрагировать !!!
    toggleAutoPlayChangeSlide: handleToggleRunAutoPlayShowSlides,
    isBlockArrow,
    // handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    //  абстрагируем смену слайдов от внешнего мира
    handlersForChangeSlide: {
      handleGoNextSlide,
      handleGoPrevSlide
    }
    ,
   
  };
};
