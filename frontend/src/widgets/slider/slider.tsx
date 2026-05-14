import { memo, useMemo, useState } from "react";
import { SliderUI } from "./ui/slider";
import type { TConfigChangeSlide, TConfigSliderProps, TSlideItem } from "./types";
import { useChangeSlide } from "./hooks/useChangeSlide";
import { sliderStore } from "./model/sliderStore";
import {
    SliderStateContext, 
    SliderActionsContext,
    SlidesContext
  } from "./utils/contexts";


export const SliderComponent = (
  {
     // infiniteLoop: boolean;
  // showSlides: number;
    isPagination,
    autoPlay,
    autoPlayTime,
  // typeSlider?:'' --> попробуй масштабировать
    children,// что будем показывать ?
    pagePaginationSize = 3 ,
  }:TConfigSliderProps
) => {
  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс или создадим какой то сервис
  // подтягиваем данные  мгновенно и только один раз
  // функция вызывается один раз - ленивая загрузка - тяжелые вычисления
const [slides] = useState<TSlideItem[]>(()=>sliderStore);

const settingChangeSlide:TConfigChangeSlide = {autoPlay,autoPlayTime,pagePaginationSize};

const dataForSlider = useChangeSlide(slides, settingChangeSlide);
  // вычисляем тему слайда 1 раз 
const getCurrentSlideTheme = useMemo(()=>{
  const currentSlide = dataForSlider.preparedSlides[dataForSlider.indexSlide]
  return currentSlide.typeTheme || 'light'
},[dataForSlider.indexSlide,dataForSlider.preparedSlides])


//  разделим контексты на действия и состояния
 const valueSliderState  = useMemo(()=>({
    slideNumber: dataForSlider.indexSlide,
    dotsPag: dataForSlider.preparedIndexesForPag,
    // для пагинации если слайдчерный чтобы тема точек было белая допустим
    currentSlideTheme: getCurrentSlideTheme,
    transitionEnabled:dataForSlider.transitionEnabled,
    isAnimation:dataForSlider.isAnimating,
  }),[
     dataForSlider.indexSlide,
     dataForSlider.isAnimating,
     dataForSlider.transitionEnabled,
     dataForSlider.preparedIndexesForPag,
     getCurrentSlideTheme
  ])
//  меняется редко поэтому выделим
  const valueSlides = useMemo(()=>({
    slides:  dataForSlider.preparedSlides,
    children
  }),[dataForSlider.preparedSlides, children])
// создадим действия 
   const valueSliderActions = useMemo(()=>({
    setIndexSlide: dataForSlider.setIndexSlide,
    handleChangeSlide: dataForSlider.handleChangeSlide,
    handleTransitionEnd: dataForSlider.handleTransitionEnd,
  }),[
     dataForSlider.handleChangeSlide,
     dataForSlider.setIndexSlide,
     dataForSlider.handleTransitionEnd
  ])
  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  return (
  <SlidesContext.Provider value={valueSlides}>
    <SliderActionsContext.Provider
      value={valueSliderActions}
      >
        <SliderStateContext.Provider
          value={valueSliderState}
        >
          <SliderUI 
            toggleAutoPlayChangeSlide={dataForSlider.toggleAutoPlayChangeSlide} 
            isPagination={isPagination}
            />
        </SliderStateContext.Provider>
      </SliderActionsContext.Provider>
  </SlidesContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
