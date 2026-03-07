import type { TSlideItem } from "@/shared/types/ui/slider";
import { useCallback, useEffect, useState } from "react";

export const useChangeSlide = (sliders: TSlideItem[], delay: number = 3000) => {
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState<number>(0);
  //  отключить/включить автоматическое изменение картинок слайдера
  const [interChangSlide, toggleIntervalSlide] = useState<boolean>(true);
  // useCallback возвращает запомненную версию функции, которая не создаётся заново при каждом рендере, а будет меняться
  // только если изменятся зависимости (sliders.length или indCurrSlide).
  //  создать хук дляслайда и выложить в папку sliders/hooks
  const handleChangeSlide = useCallback(
    (value: "increment" | "decrement") => {
      setIndexSlide((prev) => {
        if (value === "increment") {
          //  меняем слайд 'вперед'
          return prev >= sliders.length - 1 ? 0 : prev + 1;
        } else {
          //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
          return prev <= 0 ? sliders.length - 1 : prev - 1;
        }
      });
    },
    [sliders.length],
  );
  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  автоматич показ слайдов
  useEffect(() => {
    if (!interChangSlide) return;
    const intervalIdSliders = setInterval(() => {
      // handleChangeSlide("increment");
    }, delay);

    return () => {
      clearInterval(intervalIdSliders);
    };
  }, [handleChangeSlide, interChangSlide, delay]);

  return {
    indCurrSlide, // Номер текущего слайда
    setIndexSlide, // Возможность напрямую прыгнуть на любой слайд (например, по клику на точку)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    toggleIntervalSlide, // запустить/отключить интервал изменения показа слайдов автоматически
  };
};
