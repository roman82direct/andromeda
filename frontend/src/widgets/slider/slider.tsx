import { useEffect, type FC } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
import type { TSlideItem } from "@/shared/types/ui/slider";
import {useChangeSlide} from './hooks/useChangeSlide';
type TSliderProps = {
  // тип вывести в общие типы
  sliders: TSlideItem[];
};

export const Slider: FC<TSliderProps> = ({ sliders }) => {
    //работа с показом слайдов и их перелистыванием
  // Вызываем хук для обработки перелистывания слайдов
  const {indCurrSlide, setIndexSlide, handleChangeSlide} = useChangeSlide(sliders);
  // на основе текущего индекса показываем слайд из массива sliders
  const currentSlide = sliders[indCurrSlide];
  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем согласно макету
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него(те тройку слайдов где есть тек показ слайд)
  const currentIndexesPag = getPagIndexes(indCurrSlide, pagePagSize, sliders);
  return (
    <SliderUI
      indexShowSlide={indCurrSlide}
      showingSlide={currentSlide}
      onHandleChangeSlide={handleChangeSlide}
      onSetIndexSlide={setIndexSlide}
      indexesPag={currentIndexesPag}
    />
  );
};
