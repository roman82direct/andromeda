import { memo, useMemo, useState, type ReactNode } from "react";
import { SliderUI } from "./ui/slider";
import type { TConfigAutoPlay, TConfigSliderProps, TSlideItem } from "./types";
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
  // isPagination?: boolean;
    autoPlay,
    autoPlayTime,
  // typeSlider?:'' --> попробуй масштабировать
  // children: ReactNode; // что будем показывать ?
  // pagePaginationSize?:number
  }:TConfigSliderProps
) => {
  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс или создадим какой то сервис
  // подтягиваем данные  мгновенно и только один раз
  // функция вызывается один раз - ленивая загрузка - тяжелые вычисления
const [slides] = useState<TSlideItem[]>(()=>sliderStore);

const autoPlayInfo:TConfigAutoPlay = {autoPlay,autoPlayTime};

const dataForSlider = useChangeSlide(slides, autoPlayInfo );
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
  }),[dataForSlider.preparedSlides,])
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
    
      {/* <SliderUI toggleIntervalSlide={toggleIntervalSlide} /> */}
            <SliderUI  />
  
    </SliderStateContext.Provider>
      </SliderActionsContext.Provider>
      </SlidesContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
