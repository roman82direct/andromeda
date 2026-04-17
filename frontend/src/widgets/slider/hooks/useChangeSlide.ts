import type { TSlideItem, TSlideItemWithId } from "../types";
import { useCallback, useEffect, useState } from "react";
import type { TActionSlide } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";

export const useChangeSlide = (slides: TSlideItem[], delay: number = 3000) => {
//  текущий слайд который будем показывать
  const [indexSlide, setIndexSlide] = useState<number>(0);
  //  отключить/включить автоматическое изменение картинок слайдера
  const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);

  const slidesWithClones = []
  // sliders  все слайды будут в верстке - возможно ли загружать только 3  и подгружать по мере необх?
  const handleChangeSlide = useCallback(
    (action: TActionSlide) => {
      // чтобы пред слайд исчез отключаем анимацию
      setIndexSlide((prevIndex) =>
        getNextIndexSlide({
          action,
          prevIndex,
          ArrSizeSlides: slides.length,
        }),
      );
    },
    [slides.length],
  );

  // создаим тольок три слайда которые будут в dom 'сейчас'
  //  предыдущий, следующий и текущий
  const getRenderSlides = (slides: TSlideItemWithId[], current:number)=>{
    const prev = getNextIndexSlide({
      action:'decrement',
      prevIndex:current,
      ArrSizeSlides:slides.length
    })
    const next= getNextIndexSlide({
      action:'increment',
      prevIndex:current,
      ArrSizeSlides:slides.length
    })

    return {
      prev,
      current,
      next
    }
  }
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
    indexSlide, // индексы:слайд текущий
    setIndexSlide, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    // автоматич переключение слайдов
    toggleIntervalSlide,
    indexesSlides: getRenderSlides(slides, indexSlide),
  };
};
