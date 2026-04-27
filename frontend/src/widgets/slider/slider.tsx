import { memo, useState } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
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

  
  // useEffect(() => {
  //   const loadSlides =  (slidesData: TSlideItem[]) => {
      
  //     const arrSlides =  slidesData;
  //     setSliders(arrSlides);
  //   };
  //   loadSlides(sliderStore);
  // }, []);

  // Вызываем хук для обработки перелистывания слайдов
  const {
    indexSlide, // индекс:слайд текущий
    setIndexSlide, // для прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    // автоматич переключение слайдов
    // toggleIntervalSlide,
    preparedSlides,
    transitionEnabled,
    handleTransitionEnd,
    isAnimating
  } = useChangeSlide(slides);

  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем согласно макету
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него(те тройку слайдов где есть тек показ слайд)
  const currentIndexesPag = getPagIndexes(indexSlide, pagePagSize,  slides);
  // !!!!!!!!
  if (!slides.length) return <div>Сделать лоадер загрузки</div>;
  //  разделение контекстов ???
  //  обернуть объект value в useMemo 
  return (
    <SliderContext.Provider
      value={{
        slideNumber: indexSlide,
        slides:  preparedSlides,
        dotsPag: currentIndexesPag,
        setIndexSlide: setIndexSlide,
        // для пагинации если слайдчерный чтобы тема точек было белая допустим
        currentSlideTheme: preparedSlides[indexSlide].typeTheme || 'light',
        handleChangeSlide,
        transitionEnabled,
        handleTransitionEnd,
        isAnimating
      }}
    >
      {/* <SliderUI toggleIntervalSlide={toggleIntervalSlide} /> */}
            <SliderUI  />

    </SliderContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
