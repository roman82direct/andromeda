import { memo, useMemo, useState } from "react";
import { SliderUI } from "./ui/slider";
import type { TSlideItem } from "./types";
import { useChangeSlide } from "./hooks/useChangeSlide";
import { sliderStore } from "./model/sliderStore";
import { SliderContext } from "./utils/contexts";

export const SliderComponent = () => {
  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс или создадим какой то сервис
  // подтягиваем данные  мгновенно и только один раз
  // функция вызывается один раз - ленивая загрузка - тяжелые вычисления
  const [slides] = useState<TSlideItem[]>(()=>sliderStore);

const dataForSlider = useChangeSlide(slides);


 
  
  //  разделение контекстов ???
  //  обернуть объект value в useMemo 
  const contextForSlider = useMemo(()=>({
    slideNumber: dataForSlider.indexSlide,
    slides:  dataForSlider.preparedSlides,
    dotsPag: dataForSlider.preparedIndexesForPag,
    setIndexSlide: dataForSlider.setIndexSlide,
    // для пагинации если слайдчерный чтобы тема точек было белая допустим
    currentSlideTheme: dataForSlider.preparedSlides[dataForSlider.indexSlide].typeTheme || 'light',
    handleChangeSlide: dataForSlider.handleChangeSlide,
    transitionEnabled:dataForSlider.isAnimating,
    handleTransitionEnd: dataForSlider.handleTransitionEnd,
  }),[
     dataForSlider,
  ])
  
  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  return (
    <SliderContext.Provider
      value={contextForSlider}
    >
      {/* <SliderUI toggleIntervalSlide={toggleIntervalSlide} /> */}
            <SliderUI  />

    </SliderContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
