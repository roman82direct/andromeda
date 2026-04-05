import type { TSlideItem } from "@/shared/types/ui/slider";
import { useCallback, useMemo, useRef, useState } from "react";
import type { TIndexesSlides } from "../ui/types";

// export type TIndexesSlides = {
//   prev: null | number;
//   current:number
// }



export const useChangeSlide = (sliders: TSlideItem[], delay: number = 3000) => {
  //работа с показом слайдов и их перелистыванием
  // const [indCurrSlide, setIndexSlide] = useState<number>(0);

    const [indexesSlides, setIndexesSlides] = useState<TIndexesSlides>({
      prev:0,
      current:0
    });
    //  чтобы анимация появления слайда не работала при первом рендере
    const firstRenderSlide = useRef<boolean>(true);

  //  отключить/включить автоматическое изменение картинок слайдера
  const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);

  // работаем с анимацией появления слайда
  //  состояние класса анимации
  const [isAnimation,setAnimation] = useState(false);// Анимация появления
  const [isDeleteAnimation,setDelAnimation] = useState(false);  // Анимация исчезновения


  // useEffect(()=>{
  //   if(isAnimation && !isDeleteAnimation) return
  //     const id = requestAnimationFrame(()=>{
  //       // setAnimation(true)
  //     });
  //     return ()=>{
  //       cancelAnimationFrame(id)
  //     }
  // },[isAnimation,isDeleteAnimation])

   // на основе текущего индекса показываем слайд из массива sliders
  // const cashSlides = useMemo(()=>{
  //   return sliders[indCurrSlide]
  // },[indCurrSlide,sliders]) ;

    const cashSlides = useMemo(()=>{
      // переделать
    return {
      prev:sliders[indexesSlides.prev],
      current:sliders[indexesSlides.current]
    }
  },[indexesSlides, sliders]) ;



  // useEffect(()=>{
  //   if(isVisible) return;
  //     const id = requestAnimationFrame(()=>{
  //       setVisible(true)
  //     });
  //     return ()=>{
  //       cancelAnimationFrame(id)
  //     }
  // },[indCurrSlide,isVisible])
  // useCallback возвращает запомненную версию функции, которая не создаётся заново при каждом рендере, а будет меняться
  // только если изменятся зависимости (sliders.length или indCurrSlide).
  //  создать хук дляслайда и выложить в папку sliders/hooks
  const handleChangeSlide = useCallback(
    (value: "increment" | "decrement") => {
     
      // удаляем классанимации => 
      
      setAnimation(false)

      firstRenderSlide.current = false;

      setTimeout(()=>{
           
          setIndexesSlides((prev) => {
             requestAnimationFrame(()=>{
              setAnimation(true)
          // setDelAnimation(false)
            })
          
          
           
        if (value === "increment") {
          // setRender(true)
          //  меняем слайд 'вперед'
          return {
            prev: prev.current,
            current: prev.current >= sliders.length - 1 ? 0 : prev.current + 1
          
          }
        } else {
         
          //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
          return {
            prev: prev.current,
            current: prev.current <= 0 ? sliders.length - 1 : prev.current - 1
          }
        }
        
      });
      },500)
      
     
    },
    [sliders.length],
  );
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
    // indCurrSlide, // Номер текущего слайда
    // setIndexSlide, // Возможность напрямую прыгнуть на любой слайд (например, по клику на точку)
    indexesSlides,// индексы:слайд текущий и предыдущийдля анимации
    setIndexesSlides, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    toggleIntervalSlide, // запустить/отключить интервал изменения показа слайдов автоматически
    //  работа санимацией
    isAnimation,
    setAnimation,
    isDeleteAnimation,
    setDelAnimation,
    // текущий и предыдущий слайд для анимации
    cashSlides,
    firstRenderSlide
  };
};
