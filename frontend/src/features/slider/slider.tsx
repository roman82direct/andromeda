import React, { memo, useCallback, useMemo  } from "react";
import type {
  ChangeSlideSettings,
  TSliderProps,
} from "@/features/slider/types";
import { useChangeSlide } from "@/features/slider/hooks/useChangeSlide";

import {
  SliderStateContext,
  SliderActionsContext,
  SlidesContext,
} from "@/features/slider/model/contexts";

import { SliderInteractions } from "./components/slider-interactions/slider-interactions";


export const SliderComponent = React.memo(<T,>({
  infiniteLoop = true,
  quantityShowSlides = 1,
  isPagination,
  autoPlay = true,
  autoPlayTime = 3000,
  pagePaginationSize = 3,
  slides,
  children
}: TSliderProps<T>) => {
  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс или создадим какой то сервис
  // подтягиваем данные  мгновенно и только один раз
  // функция вызывается один раз - ленивая загрузка - тяжелые вычисления

  const settingChangeSlide: ChangeSlideSettings = {
    autoPlay,
    autoPlayTime,
    pagePaginationSize,
    infiniteLoop,
  };

  const dataForSlider = useChangeSlide<T>(slides, settingChangeSlide);
  // вычисляем тему слайда 1 раз
  // const getCurrentSlideTheme = useMemo(() => {
  //   const currentSlide = dataForSlider.preparedSlides[dataForSlider.indexSlide];
  //   return currentSlide?.typeTheme ??  'light';
  // }, [dataForSlider.indexSlide, dataForSlider.preparedSlides]);

  //  разделим контексты на действия и состояния
  //  состояние элементов контроля 
  const valueSliderState = useMemo(
    () => ({
      slideNumber: dataForSlider.indexSlide,
      dotsPag: dataForSlider.preparedIndexesForPag,
      // по ум тема слайда неизвестна - необходимо обработать это в виджете
      // currentSlideTheme: 'unknown',
      transitionEnabled: dataForSlider.transitionEnabled,
      isAnimation: dataForSlider.isAnimating,
      isBlockArrow: dataForSlider.isBlockArrow,
    }),
    [
      dataForSlider.indexSlide,
      dataForSlider.isAnimating,
      dataForSlider.transitionEnabled,
      dataForSlider.preparedIndexesForPag,
      // getCurrentSlideTheme,
      dataForSlider.isBlockArrow,
    ],
  );
  //  меняется редко поэтому выделим
  //  сами слайды
  const valueSlides = useMemo(
    () => ({
      slides: dataForSlider.preparedSlides,

      quantityShowSlides,
    }),
    [dataForSlider.preparedSlides, quantityShowSlides],
  );
  // создадим действия
  const valueSliderActions = useMemo(
    () => ({
      setIndexSlide: dataForSlider.setIndexSlide,
      // handleChangeSlide: dataForSlider.handleChangeSlide,
      handlersForChangeSlide: {
       handleGoNextSlide: dataForSlider.handlersForChangeSlide.handleGoNextSlide,
       handleGoPrevSlide: dataForSlider.handlersForChangeSlide.handleGoPrevSlide
    },
      handleTransitionEnd: dataForSlider.handleTransitionEnd,
    }),
    [
      dataForSlider.handlersForChangeSlide.handleGoNextSlide,
       dataForSlider.handlersForChangeSlide.handleGoPrevSlide,
      dataForSlider.setIndexSlide,
      dataForSlider.handleTransitionEnd,
    ],
  );

  //  параметры автоплея
const stopAutoPlay = useCallback(() => {
  if(!autoPlay) return;
    // отключ автоматич перекл слайдов
    dataForSlider.toggleAutoPlayChangeSlide(true)
}, [dataForSlider, autoPlay]);

const runAutoPlay = useCallback(() => {
  if(!autoPlay) return;
  // запуск автоматич перекл слайдов
  dataForSlider.toggleAutoPlayChangeSlide(false);
}, [dataForSlider,autoPlay]);



  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  return (
    <SlidesContext.Provider value={valueSlides}>
      <SliderActionsContext.Provider value={valueSliderActions}>
        <SliderStateContext.Provider value={valueSliderState}>
          <SliderInteractions autoPlayParams={{
                                                flag:autoPlay,
                                                stopAutoPlay: stopAutoPlay,
                                                runAutoPlay: runAutoPlay,
                                                goNextSlide: dataForSlider.handlersForChangeSlide.handleGoNextSlide,
                                                goPrevSlide:   dataForSlider.handlersForChangeSlide.handleGoPrevSlide
                                              }} >
              {children({
                  isPagination: isPagination,
                  
              })}
          </SliderInteractions>
        </SliderStateContext.Provider>
      </SliderActionsContext.Provider>
    </SlidesContext.Provider>
  );
});

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
