import type { TSlideItem, TSlideItemWithId } from "../types";
import { useCallback, useEffect, useState } from "react";
import type { TActionSlide } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";

export const useChangeSlide = (slides: TSlideItem[], delay: number = 3000) => {
//  текущий слайд который будем показывать
  const [indexSlide, setIndexSlide] = useState<number>(1);
  //  отключить/включить автоматическое изменение картинок слайдера
  const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);
//  подготовка слайдов ксозданию бесконечной прокрутки
//  создаем клон первого и последнего
  const slidesWithClones = [slides[slides.length-1],...slides, slides[0]];
  
  // console.log(slidesWithClones)
    // console.log(slidesWithClones.length)

  //  определяем количество оригинальных слайдов
  const [length, setLength] = useState<number>(slides.length);

  //  const showSlides = 1; // по ум показываем 1 слайд
  // sliders  все слайды будут в верстке - возможно ли загружать только 3  и подгружать по мере необх?
  const handleChangeSlide = useCallback(
    (action: TActionSlide) => {
      // чтобы пред слайд исчез отключаем анимацию
      setIndexSlide((prevIndex) =>
        getNextIndexSlide({
          action,
          prevIndex,
          // убрал slides.length
          ArrSizeSlides: slidesWithClones.length,
        }),
      );
    },
    [slidesWithClones.length],
  );
// const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
const [transitionEnabled, setTransitionEnabled]=useState(true);

useEffect(()=>{
  if(indexSlide===1 || indexSlide === slides.length){
    const rafTransition = requestAnimationFrame(()=>{
          setTransitionEnabled(true)

    })
    return(()=>{
      cancelAnimationFrame(rafTransition)
    })
  }
},[indexSlide,slides.length])
//  исправить пагинацию!!!!
  const handleTransitionEnd = ()=>{
    
        if(indexSlide === 0){
         setTransitionEnabled(false);
        //  нулевой слайд - клон последнего слайда (из оригинальных)
        //  нам нужно уйтис него
        //  идем к последнему 
         setIndexSlide(slides.length);
         console.log(slides.length)
        }
        if(indexSlide === slides.length+ 1){
          //  унас последний слайд - он клон первого слайда (из оригинальных)
          // length+ 1
          setTransitionEnabled(false);
        //  идем  к оригинальному первомму слайду
          //  отправляем на первыйслайд(минуя клон(последнего слайда) с начала)
         setIndexSlide(1)

        }
  }

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
    preparedSlides: slidesWithClones,
    transitionEnabled,
    handleTransitionEnd
  };
};
