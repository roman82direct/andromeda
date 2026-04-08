import type {  TSlideItem,  } from "../types";
import { useCallback,  useMemo, useRef, useState } from "react";
import type { TActionSlide } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";
import { v4 as uuidv4 } from 'uuid';

// export type TIndexesSlides = {
//   prev: null | number;
//   current:number
// }


// delay: number = 3000
export const useChangeSlide = (sliders: TSlideItem[], ) => {
  //работа с показом слайдов и их перелистыванием
  // const [indCurrSlide, setIndexSlide] = useState<number>(0);

    const [indexSlide, setIndexSlide] = useState<number>(0);
      const nextIndexSlide = getNextIndexSlide({
      action:'increment',
      prevIndex: indexSlide,
      ArrSizeSlides: sliders.length
    });
  // определяем предыдущий индекс слайда на основе текущего
    const prevIndexSlide = getNextIndexSlide({
       action:'decrement',
      prevIndex: indexSlide,
        ArrSizeSlides: sliders.length
    })

  // const cashSlides = useMemo(()=>(
  //   [ 
  //     {id: uuidv4(), ...sliders[prevIndexSlide]},
  //     {id: uuidv4(), ...sliders[indexSlide]},
      
    
  //     {id: uuidv4(), ...sliders[nextIndexSlide]},
  //   ]
  // ),[sliders, indexSlide, nextIndexSlide, prevIndexSlide])
 
 

  //  обновим состояние тройки слайдов
  


    //  чтобы анимация появления слайда не работала при первом рендере
    const firstRenderSlide = useRef<boolean>(true);

  
  //  отключить/включить автоматическое изменение картинок слайдера
  // const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);

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
  //  определяем след индекс слайда на основе текущего
    
    //  мемоизация
    // const cashSlides:TRenderSlides=useMemo(()=>(
       
    //   { 
    //    current: {id: uuidv4(), typeSlide:'current', ...sliders[indexSlide]},
    //    next: {id: uuidv4(), typeSlide:'next', ...sliders[nextIndexSlide]},
    //    prev: { id: uuidv4(), typeSlide:'prev', ...sliders[prevIndexSlide]},
    //   }
      
       
      
    // ),[sliders, indexSlide, nextIndexSlide, prevIndexSlide]) ;



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
    (action: TActionSlide) => {
     
      // удаляем классанимации => 
       if(!firstRenderSlide.current ){
         requestAnimationFrame(()=>{
                setAnimation(false)
      setDelAnimation(false)
            })
      
      }
      
      firstRenderSlide.current = false;

     


      requestAnimationFrame(()=>{
           
          setIndexSlide((prevIndex) => {
            //  операции с анимацией  переход слайдов
            //  подумать ??? requestAnimationFrame
             requestAnimationFrame(()=>{
              setAnimation(true)
              setDelAnimation(true)
            })
            return getNextIndexSlide(
              {
                action,
                prevIndex,
                ArrSizeSlides: sliders.length
              }
            )  
          
           
        
        
      });
      })
      
     
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
    indexSlide,// индексы:слайд текущий 
    setIndexSlide, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    // toggleIntervalSlide, // запустить/отключить интервал изменения показа слайдов автоматически
    //  работа санимацией
    isAnimation,
    setAnimation,
    isDeleteAnimation,
    setDelAnimation,
    // текущий и предыдущий слайд для анимации
    cashSlides: sliders,
    firstRenderSlide
  };
};
