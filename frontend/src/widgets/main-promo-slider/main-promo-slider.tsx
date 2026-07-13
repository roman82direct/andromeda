import { memo, useMemo, useState } from "react";
import { MainPromoSliderUI } from "./ui/main-promo-slider";
import type {
  TConfigChangeSlide,
  TConfigSliderProps,
  // TKeysSlideItem,
  TSlideItem,
  // TValuesSlideItem,
} from "./types";
import { useChangeSlide } from "@/features/slider";
// import { useChangeSlide } from './delete-hooks/useChangeSlide';

import { sliderStore } from "./model/sliderStore";
import {
  SliderStateContext,
  SliderActionsContext,
} from "@/features/slider/model/contexts";
import { SlidesContext } from "@/features/slider/model/contexts";


export const MainPromoSliderComponent = ({
  infiniteLoop = true,
  quantityShowSlides = 1,
  isPagination,
  autoPlay = false,
  autoPlayTime = 3000,
  pagePaginationSize = 3,
}: TConfigSliderProps) => {
  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс или создадим какой то сервис
  // подтягиваем данные  мгновенно и только один раз
  // функция вызывается один раз - ленивая загрузка - тяжелые вычисления
  const [slides] = useState<TSlideItem[]>(() => sliderStore);
 
  const settingChangeSlide: TConfigChangeSlide = {
    autoPlay,
    autoPlayTime,
    pagePaginationSize,
    infiniteLoop,
  };

  const dataForSlider = useChangeSlide(slides, settingChangeSlide);
  // вычисляем тему слайда 1 раз
  const getCurrentSlideTheme = useMemo(() => {
    const currentSlide = dataForSlider.preparedSlides[dataForSlider.indexSlide];
    return currentSlide.typeTheme || "light";
  }, [dataForSlider.indexSlide, dataForSlider.preparedSlides]);

  //  разделим контексты на действия и состояния
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
  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  return (
    <SlidesContext.Provider value={valueSlides}>
      <SliderActionsContext.Provider value={valueSliderActions}>
        <SliderStateContext.Provider value={valueSliderState}>
          <MainPromoSliderUI
            toggleAutoPlayChangeSlide={dataForSlider.toggleAutoPlayChangeSlide}
            isPagination={isPagination}
          />
        </SliderStateContext.Provider>
      </SliderActionsContext.Provider>
    </SlidesContext.Provider>
  );
};

export const MainPromoSlider = memo(MainPromoSliderComponent);
MainPromoSlider.displayName = "MainPromoSlider";
