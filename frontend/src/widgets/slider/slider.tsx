import { memo, useEffect, useState } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
import type { TSlideItem } from "./types";
import { useChangeSlide } from "./hooks/useChangeSlide";
import { sliderStore } from "./model/sliderStore";
import { SliderContext } from "./utils/contexts";

export const SliderComponent = () => {
  const [sliders, setSliders] = useState<TSlideItem[]>([]);

  // загружаем информацию о слайдах в наш компонент
  //  если запрос на сервер можно создать стор с редукс
  useEffect(() => {
    const loadSlides = async (slidesData: TSlideItem[]) => {
      const arrSlides = await slidesData;
      setSliders(arrSlides);
    };
    loadSlides(sliderStore);
  }, []);

  // Вызываем хук для обработки перелистывания слайдов
  const {
    indexSlide, // индекс:слайд текущий
    setIndexSlide, // для прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    // автоматич переключение слайдов
    toggleIntervalSlide,
    indexesSlides
  } = useChangeSlide(sliders);

  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем согласно макету
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него(те тройку слайдов где есть тек показ слайд)
  const currentIndexesPag = getPagIndexes(indexSlide, pagePagSize, sliders);
  // !!!!!!!!
  if (!sliders.length) return <div>Сделать лоадер загрузки</div>;
  //  разделение контекстов ???
  return (
    <SliderContext.Provider
      value={{
        slideNumber: indexSlide,
        slides: sliders,
        dotsPag: currentIndexesPag,
        setIndexSlide: setIndexSlide,
        // для пагинации если слайдчерный чтобы тема точек было белая допустим
        currentSlideTheme: sliders[indexSlide].typeTheme,
        handleChangeSlide,
        indexesSlides,
      }}
    >
      <SliderUI toggleIntervalSlide={toggleIntervalSlide} />
    </SliderContext.Provider>
  );
};

export const Slider = memo(SliderComponent);
Slider.displayName = "Slider";
