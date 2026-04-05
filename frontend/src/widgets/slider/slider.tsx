import {  memo } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
import type { TSlideItem } from "@/shared/types/ui/slider";
import { useChangeSlide } from "./hooks/useChangeSlide";
type TSliderProps = {
  // тип вывести в общие типы
  sliders: TSlideItem[];
};

export const SliderComponent = ({ sliders }:TSliderProps) => {
  



  //работа с показом слайдов и их перелистыванием
  // Вызываем хук для обработки перелистывания слайдов
  const {
    indexesSlides,
    setIndexesSlides,
    handleChangeSlide,
    toggleIntervalSlide,
    isAnimation,
    isDeleteAnimation,
    cashSlides,
    firstRenderSlide
  } = useChangeSlide(sliders);
 
  
  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем согласно макету
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него(те тройку слайдов где есть тек показ слайд)
  //  кешируем результат пагинации чтобы просто так не было рендеров
  const currentIndexesPag = 
  getPagIndexes( indexesSlides.current, pagePagSize, sliders)
//   возможно кешировать ????

  return (
     <SliderUI
        isFirstRender={firstRenderSlide.current}
    //  cashSlides  - значение прерва сюда
        prevSlide={cashSlides.prev}
      //   перерисовываем компонент если его содержение меняестя, чтобы наща анимация появления/ удаления слайда сработала
        isDeleteAnimation={isDeleteAnimation}
        isAnimation={isAnimation}
        //  надо будет тоже изменить на значение текиндекса объекат
        indexShowSlide={ indexesSlides.current}
        //  поменять
        showingSlide={cashSlides.current}
        onHandleChangeSlide={handleChangeSlide}
        onSetIndexesSlides={setIndexesSlides}
        indexesPag={currentIndexesPag}
        toggleIntervalSlide={toggleIntervalSlide}
    />
  );
};


export const Slider = memo(SliderComponent);
Slider.displayName= 'Slider';


