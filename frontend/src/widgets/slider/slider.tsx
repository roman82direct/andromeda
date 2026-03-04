import { useCallback, useEffect, useState, type FC } from "react";
import { SliderUI } from "./ui/slider";
import { getPagIndexes } from "./utils/getPagIndexes";
import type { TSlideItem } from "@/shared/types/ui/slider";

type TSliderProps = {
  // тип вывести в общие типы
  sliders: TSlideItem[];
};

export const Slider: FC<TSliderProps> = ({ sliders }) => {
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState(0);
  // на основе текущего индекса показываем слайд из массива sliders
  const currentSlide = sliders[indCurrSlide];
  //  работа с пагинацией слайдов - сколько кнопок пагинации показываем
  const pagePagSize = 3;
  // вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
  // чтобы можно было показать тек слайд, слайд перед ним и после него
  const currentIndexesPag = getPagIndexes(indCurrSlide, pagePagSize, sliders);
  // useCallback возвращает запомненную версию функции, которая не создаётся заново при каждом рендере, а будет меняться
  // только если изменятся зависимости (sliders.length или indCurrSlide).
  //  создать хук дляслайда и выложить в папку sliders/hooks
  const handleChangeSlide = useCallback(
    (value: "increment" | "decrement") => {
      let newIndexCurrSlide;
      if (value === "increment") {
        //  меняем слайд 'вперед'
        newIndexCurrSlide =
          indCurrSlide >= sliders.length - 1 ? 0 : indCurrSlide + 1;
      } else {
        //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
        newIndexCurrSlide =
          indCurrSlide <= 0 ? sliders.length - 1 : indCurrSlide - 1;
      }
      //  изменяем состояние показа слайда - т е меняем индекс слайда который будет отобр
      setIndexSlide(newIndexCurrSlide ?? 0);
      // setIndexesPag(getPagIndexes(newIndexCurrSlide,pagePagSize))
      // setIndexesPag(forIndexesPag)
    },
    [sliders.length, indCurrSlide],
  );

  useEffect(() => {
    const intervalOfMovingSliders = setInterval(() => {
      handleChangeSlide("increment");
    }, 4000);
    return () => {
      clearInterval(intervalOfMovingSliders);
    };
  }, [handleChangeSlide]);
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
