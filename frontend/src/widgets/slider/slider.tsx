import {  memo, useEffect, useState } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
import type { TSlideItem } from "./types";
import { useChangeSlide } from "./hooks/useChangeSlide";
import {sliderStore} from './model/sliderStore';

export const SliderComponent = () => {
  
  const [sliders, setSliders] = useState<TSlideItem[]>([])

  // загружаем информацию о слайдах в наш компонент
  useEffect(()=>{
    const loadSlides = async(slidesData:TSlideItem[])=>{
      const arrSlides = await slidesData;
      setSliders(arrSlides)
    }
    loadSlides(sliderStore)
  },[])

  //работа с показом слайдов и их перелистыванием
  // Вызываем хук для обработки перелистывания слайдов
  const {
    indexSlide,// индекс:слайд текущий 
    setIndexSlide, // для прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    toggleIntervalSlide, // запустить/отключить интервал изменения показа слайдов автоматически
    //  работа санимацией
    isAnimation,
    isDeleteAnimation,
    // текущий и предыдущий слайд для анимации
    cashSlides,
    firstRenderSlide
  } = useChangeSlide(sliders);
 

  console.log('cashSlides',cashSlides)
  console.log("sliders",sliders)
  
  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем согласно макету
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него(те тройку слайдов где есть тек показ слайд)
  //  кешируем результат пагинации чтобы просто так не было рендеров
  const currentIndexesPag = 
  getPagIndexes( indexSlide, pagePagSize, sliders)
//   возможно кешировать ????
  if(!sliders.length) return <div>Сделать лоадер загрузки</div>
  return (
     <SliderUI
        isFirstRender={firstRenderSlide.current}
    //  cashSlides  - значение прерва сюда - предыдущий слайд
        prevSlide={cashSlides.prev}
        showingSlide={cashSlides.current}
        nextSlide= {cashSlides.next}
      //   перерисовываем компонент если его содержение меняестя, чтобы наща анимация появления/ удаления слайда сработала
        isDeleteAnimation={isDeleteAnimation}
        isAnimation={isAnimation}
        //  надо будет тоже изменить на значение текиндекса объекат
        indexShowSlide={ indexSlide}
        //  поменять
       
        onHandleChangeSlide={handleChangeSlide}
        onSetIndexSlide={setIndexSlide}
        indexesPag={currentIndexesPag}
        toggleIntervalSlide={toggleIntervalSlide}
    />
  );
};


export const Slider = memo(SliderComponent);
Slider.displayName= 'Slider';


