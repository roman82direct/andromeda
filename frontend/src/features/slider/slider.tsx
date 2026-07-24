import { memo, useCallback, useMemo } from "react";
import type {
  BasedSlide,
  ChangeSlideSettings,
  TSliderProps,
} from "@/features/slider/types";
import { useChangeSlide } from "@/features/slider/hooks/useChangeSlide";

import {
  SliderStateContext,
  SliderActionsContext,
  SlidesContext,
} from "@/features/slider/model/contexts";
import { useSliderInteractions } from "./hooks/useSliderInteraction";



export const SliderComponent = <T extends BasedSlide,>({
  infiniteLoop = true,
  quantityShowSlides = 1,
  isPagination,
  autoPlay = false,
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
  const getCurrentSlideTheme = useMemo(() => {
    const currentSlide = dataForSlider.preparedSlides[dataForSlider.indexSlide];
    return currentSlide?.typeTheme ??  'light';
  }, [dataForSlider.indexSlide, dataForSlider.preparedSlides]);

  //  разделим контексты на действия и состояния
  //  состояние элементов контроля 
  const valueSliderState = useMemo(
    () => ({
      slideNumber: dataForSlider.indexSlide,
      dotsPag: dataForSlider.preparedIndexesForPag,
      // для пагинации если слайдчерный чтобы тема точек было белая допустим
      currentSlideTheme: getCurrentSlideTheme,
      transitionEnabled: dataForSlider.transitionEnabled,
      isAnimation: dataForSlider.isAnimating,
      isBlockArrow: dataForSlider.isBlockArrow,
    }),
    [
      dataForSlider.indexSlide,
      dataForSlider.isAnimating,
      dataForSlider.transitionEnabled,
      dataForSlider.preparedIndexesForPag,
      getCurrentSlideTheme,
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
      handleChangeSlide: dataForSlider.handleChangeSlide,
      handleTransitionEnd: dataForSlider.handleTransitionEnd,
    }),
    [
      dataForSlider.handleChangeSlide,
      dataForSlider.setIndexSlide,
      dataForSlider.handleTransitionEnd,
    ],
  );
//  свайпы?
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


const {
  onPointerEnter, 
  onPointerLeave, 
  onPointerUp,  
  onPointerDown,
  onPointerCancel
} = useSliderInteractions({
  enabled: autoPlay,
  callBackStop: stopAutoPlay,
  callBackStart: runAutoPlay,
})

  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  return (
    <SlidesContext.Provider value={valueSlides}>
      <SliderActionsContext.Provider value={valueSliderActions}>
        <SliderStateContext.Provider value={valueSliderState}>
          <div
           //  тач прикосновение
            onPointerDown={onPointerDown}
            onPointerUp = {onPointerUp}
            // работа с мышкой границы
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerCancel={onPointerCancel}
            >
            {children({
                isPagination: isPagination,
                
            })}
          </div>
        </SliderStateContext.Provider>
      </SliderActionsContext.Provider>
    </SlidesContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
