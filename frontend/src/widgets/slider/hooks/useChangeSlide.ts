import type { TSlideItem, TSlideItemWithId } from "../types";
import { useCallback,   useMemo,  useState } from "react";
import type { TActionSlide } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";
import { getPagIndexes } from "../utils/getPagIndexes";

export const useChangeSlide = (slides: TSlideItem[], delay: number = 3000) => {
//  текущий слайд который будем показывать
  const firstRealIndexSlide = 1;
  const [indexSlide, setIndexSlide] = useState<number>(firstRealIndexSlide);
  // пагинация
  const preparedIndexesForPag = useMemo(()=>{
    const pagePagSize = 3;
    const currentIndexesPag = getPagIndexes(indexSlide-1, pagePagSize, slides);
    return currentIndexesPag.map((dotIndex)=>(
  dotIndex+1
  ))},[indexSlide, slides])
  //  отключить/включить автоматическое изменение картинок слайдера
  // const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);
//  подготовка слайдов ксозданию 'бесконечной прокрутки'
const slidesWithClones = useMemo(()=>{
     return slides.length>0 ? [slides[slides.length-1],...slides, slides[0]] : [];
  },[slides])

const [isAnimating, setIsAnimating] = useState(false)

  const handleChangeSlide = useCallback(
    (action: TActionSlide) => {
      //  если анимация идет - не даем выполнить обработчик
        if(isAnimating) return;
      // если сейчас анимации переключения слайда нет
      //  то можем выполнить смену слайда
      setIsAnimating(true)
      // if(!isAnimationRef.current){
          setIndexSlide((prevIndex) =>
        getNextIndexSlide({
          action,
          prevIndex,
          // убрал slides.length
          ArrSizeSlides: slidesWithClones.length,
        }),
      );
    
   
    
    },
    [slidesWithClones.length, isAnimating],
  );
//  исправить пагинацию!!!!
  const handleTransitionEnd = ()=>{
    // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
        setIsAnimating(false);
      

        if(indexSlide === 0){
          //  над данном этапе отключаем анимацию перехода тк это 'клон'
          // объединить состояния??? 
         
      
        //  нулевой слайд - клон последнего слайда (из оригинальных)
        //  нам нужно уйтис него
        //  идем к последнему 
         setIndexSlide(slides.length);
        }
        if(indexSlide === slides.length+ 1){
          //  унас последний слайд - он клон первого слайда (из оригинальных)
          // length+ 1
        //  над данном этапе отключаем анимацию перехода тк это 'клон' 
        //  идем  к оригинальному первомму слайду
          //  отправляем на первыйслайд(минуя клон(последнего слайда) с начала)
         setIndexSlide(1)
        }
}

  
  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  автоматич показ слайдов
  // useEffect(() => {
  //   if (!interChangSlide) return;
  //   const intervalIdSliders = setInterval(() => {
  //     // handleChangeSlide("increment");
  //   }, delay);

  //   return () => {
  //     clearInterval(intervalIdSliders);
  //   };
  // }, [handleChangeSlide, interChangSlide, delay]);

  return {
    indexSlide, // индексы:слайд текущий
    setIndexSlide, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    // автоматич переключение слайдов
    // toggleIntervalSlide,
    preparedSlides: slidesWithClones,
    isAnimating,
    handleTransitionEnd,
    preparedIndexesForPag
  };
};
