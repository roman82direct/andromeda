import { SliderActionTypes, type ChangeSlideSettings } from "../types";
import { useCallback, useMemo, useReducer, useEffect } from "react";
// import type { TypeOperationFlip } from "../types";
import { getPagIndexes } from "../utils/getPagIndexes";
import {
  createInitialStateSlider,
  sliderReducer,
} from "../model/sliderReducer";

// import { useEffect, useState } from "react";
// import type { ChangeSlideSettings } from "../types";


// export const useChangeSlide3 = <T>(
//   slides: T[],
//   {
//     autoPlay,
//     pagePaginationSize,
//     infiniteLoop,
//     quantityShowSlides = 1
//   }: ChangeSlideSettings,
// ) => {
//   //  индекс текущ  слайда зависит от  кол-ва слайдов на экране
//   // с какого элемента сейчас начинается отображаемая область?
//   const [currentIndex, setCurrentIndex] = useState(
//     // quantityShowSlides если клоны слайда тек индекс
//     //  начнется с позиции quantityShowSlides
//       infiniteLoop ?  quantityShowSlides : 0
//     )
//   // определим количество настоящих элементов
//   const [length, setLength] = useState(slides.length);
//   //  нужно ли делать бесконеную карусель  ?
//   const [isRepeating, setIsRepeating] = useState(
//     infiniteLoop && slides.length >  quantityShowSlides
//   )
//   //  css анимация перехода
//   const [transitionEnabled, setTransitionEnabled] = useState(true)
//   // если изменились слайды или кол-во отобр слайдов на экране 
//   // или значение бесконеч цикла то пересчитаем параметры карусели
// //  следим за актуальностью данных
//   useEffect(()=>{
//   //  подумать!!!
//   const id = setTimeout(()=>{
//     setLength(slides.length);
//     setIsRepeating(infiniteLoop  && slides.length > quantityShowSlides)
//   })
//   return (()=>{
//     clearTimeout(id)
//   })
// },[slides, infiniteLoop, quantityShowSlides]);

// //  'перещение' ленты слайдера вперед
// const  handleGoNextSlide = ()=> {
//   //  вычесляем макс  позицию для показа слайдов
//   const maxIndexShowPos = length - quantityShowSlides;
//   //  если слайдов больше,
//     //  чем помещается на экране
//     //  и тек индекс меньше макс индека позиции показа
//     // isRepeating  бесконечный режим двигает слайдыв сегда
//     if(isRepeating || currentIndex <  maxIndexShowPos ) {
//       setCurrentIndex(prevIndex =>prevIndex + 1)
//     }
//   }

//   // 'перещение' ленты слайдера назад
//   const handleGoPrevSlide = () => {
//     // isRepeating  бесконечный режим двигает слайдыв сегда
//     if(isRepeating || currentIndex > 0 ) {
//       setCurrentIndex(prevIndex=>prevIndex- 1)
//     }
//   }

//   // Этот обработчик вызывается, когда CSS-анимация закончилась.
//   const handleTransitionEnd = ()=> {
//     //  если есть бесконечный цикл
//     if(isRepeating){
//       //  если мы оказались на '"последнем" клоне слева'
//       if(currentIndex === 0) {
//         // выключаем анимацию 'перехода' слайдов
//         setTransitionEnabled(false);
//         // переходим на первый после клонов настоящий слайд слева
//         setCurrentIndex(length);
//       }
//       //  если вправо идем и достигли 'первого' клона слайда
//       if(currentIndex === length + quantityShowSlides) {
//         // выключаем анимацию 'перехода' слайдов
//         setTransitionEnabled(false);
//         // перезодим на его подлинник слева
//         setCurrentIndex(quantityShowSlides)
//       }
//     }
//   }

//   const preparedSlides = ()=>{
  
//     if(isRepeating) {
//       //  копируем слайды по кол-ву quantityShowSlides
//       const prevClones = []; // копируем последние элементы  
//       const nextClones  = []; // копируем первые элементы  
//       for(let index = 0; index<quantityShowSlides; index++) {
//         prevClones.push(slides[length-1-index]);
//         nextClones.push(slides[index])
//       }
//       // делаем прав порядок
//        prevClones.reverse();
//        return [...prevClones, ...slides , ...nextClones]
//     }
//     console.log()
//     return slides
//      // return [slides[slides.length - 1], ...slides, slides[0]];
//   }
//   return {
//     indexSlide: currentIndex, // индексы:слайд текущий
//     setIndexSlide: setCurrentIndex, // для прыжка на люб слайд (пагинация)
//     isAutoPlay: false, // доработать
//     preparedSlides: preparedSlides(),
//     isAnimating: false,// доработать,
//     transitionEnabled: transitionEnabled,
//     handleTransitionEnd,
//     preparedIndexesForPag:[1,2,3],// доработать,
//     isBlockArrow:{// доработать,
//       isLeftArrow: false,
//       isRightArrow: false,
//     },// доработать
//     //  абстрагируем смену слайдов от внешнего мира
//     handlersForChangeSlide: {
//       handleGoNextSlide,
//       handleGoPrevSlide
//     },
//     // абстрагируем переключение автоплея слайдов от внешнего мира
//     handlersForAutoPlay: {
//       // доработать
//       runAutoPlay: ()=>{},
//       stopAutoPlay: ()=>{}
//     }
//     ,
   
//   };
// };


// export const useChangeSlide2 = <T>(
//   slides: T[],
//   {
//     autoPlay,
//     pagePaginationSize,
//     infiniteLoop,
//     quantityShowSlides = 1
//   }: ChangeSlideSettings,
// ) => {
//   // 1. Подготавливаем слайды с клонами
//   // (абстрагировать логику клонирования - допустим если нам это не надо)
//   const preparedSlides = useMemo(() => {
//     if (slides.length === 0) return slides;
//     if (infiniteLoop) {
//       const maxIndexShow = slides.length - quantityShowSlides;
//       const clonesFirstSlides = [];
//       const clonesLastSlides = [];
//       for(let i =1; i<=quantityShowSlides; i++){
//           clonesFirstSlides.push(slides[i])
//           clonesLastSlides.push(slides[slides.length - i])
//       }
//       // console.log("clonesFirstSlides",clonesFirstSlides.length);
//       // console.log("clonesLastSlides",clonesLastSlides.length);
//       // console.log([...clonesLastSlides, ...slides, ...clonesFirstSlides])
//       // console.log('slides',slides);
//       //  БАГ на верхнем слайде
//       // return [slides[slides.length - 1], ...slides, slides[0]];
//       return [...clonesLastSlides, ...slides, ...clonesFirstSlides];

//     } else {
//       return slides;
//     }
//   }, [infiniteLoop, slides, quantityShowSlides]);

//   const [stateSlider, dispatch] = useReducer(
//     sliderReducer,
//     // на основе 2 обхектаинициализируем состояние
//     preparedSlides,
//     // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
//     (slides: T[]) => {
//       //  создадим изначальное состояние слайдера
//       const initialStateSlider = createInitialStateSlider<T>();
//       //  определим индекс  текущ показываемого слайда 
//       //  если цикл бесконечный то покказываем index + кол-во показ слайдов
//       const currentIndexSlide = infiniteLoop
//         ? quantityShowSlides
//         : 0;

//         console.log(currentIndexSlide)
//       return {
//         ...initialStateSlider,
//         indexSlide: currentIndexSlide,
//         preparedSlides: slides,
//       };
//     },
//   );

//   // нужно ли вообще делать бесконечную карусель ?
//   // const [isRepeating, setIsRepeating] = useState(
//   //   infiniteLoop && slides.length > quantityShowSlides
//   // )

//   //  обновление слайдов(напр если они пришли с сервера снова)
//   useEffect(() => {
//     dispatch({
//       type: SliderActionTypes.setPreparedSlides,
//       payload: preparedSlides,
//     });
//   }, [preparedSlides]);

//   // если слайдер не бесконечный скрывам стрелку  если слайд первый или последний
//   const isRightArrow = !infiniteLoop && stateSlider.indexSlide === 0;
//   const isLeftArrow =
//     !infiniteLoop &&
//     stateSlider.indexSlide === stateSlider.preparedSlides.length - 1;
//   const isBlockArrow = {
//     isLeftArrow,
//     isRightArrow,
//   };
//   // определим пагинацию

//   const preparedIndexesForPag = useMemo(() => {
//     const currentIndexesPag = getPagIndexes(
//       // бесконеч цикл это лишний первый или последний слайд
//       // поэтому подстраиваем совпадение пагинации
//       infiniteLoop ? stateSlider.indexSlide - 1 : stateSlider.indexSlide,
//       pagePaginationSize || 3,
//       slides.length,
//     );
//     return currentIndexesPag.map((dotIndex) =>
//       infiniteLoop ? dotIndex + 1 : dotIndex,
//     );
//   }, [stateSlider.indexSlide, slides.length, pagePaginationSize, infiniteLoop]);

//   //  отключить/включить автоматическое изменение картинок слайдера
//   //  подготовка слайдов ксозданию 'бесконечной прокрутки'
//   const handleChangeSlide = useCallback((typeOperation: TypeOperationFlip) => {
//     dispatch({ type: SliderActionTypes.changeSlide, payload: typeOperation });
//   }, []);
// //  инкапсулируем логику переключения слайдов
//   const handleGoNextSlide = useCallback(() => {
//       handleChangeSlide('increment');
//   }, [handleChangeSlide]);

//   const handleGoPrevSlide = useCallback(() => {
//       handleChangeSlide('decrement');
//   }, [handleChangeSlide]);

//   const handleTransitionEnd = useCallback(() => {
//     // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
//     dispatch({
//       type: SliderActionTypes.transitionEnd,
//       payload: infiniteLoop || false,
//     });
//   }, [infiniteLoop]);

//   //  можем сменить слайд на тот который нам нужно
//   const setIndexSlide = useCallback((indexSlide: number) => {
//     dispatch({ type: SliderActionTypes.setIndex, payload: indexSlide });
//   }, []);

//   // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
//   //  обработчик для onMouseOn onMouseEnter
//   //  useCallback 
//   const handleToggleRunAutoPlayShowSlides = useCallback((flagAutoPlay: boolean) => {
//     // console.log(stateSlader)
//     dispatch({
//       type: SliderActionTypes.toggleAutoPlay,
//       payload: !flagAutoPlay, // Если пауза (true), то автоплей станет false (выключен)
//     });
    
//   },[]);
//   // инкапсулируем логику включения или выключения состояния автоплея из состояния
//   // всего слайдера
// // включить автоплей
//   const turnOnAutoPlay = useCallback(()=>{
//      if(!autoPlay) return;
//     handleToggleRunAutoPlayShowSlides(true);
//   },[handleToggleRunAutoPlayShowSlides, autoPlay])
// // выключить автоплей
//     const turnOffAutoplay = useCallback(()=>{
//      if(!autoPlay) return;
//     handleToggleRunAutoPlayShowSlides(false);
//   },[handleToggleRunAutoPlayShowSlides, autoPlay])



//   return {
//     indexSlide: stateSlider.indexSlide, // индексы:слайд текущий
//     setIndexSlide, // для прыжка на люб слайд (пагинация)
//     isAutoPlay: stateSlider.isAutoPlay,
//     preparedSlides: stateSlider.preparedSlides,
//     isAnimating: stateSlider.isAnimating,
//     transitionEnabled: stateSlider.transitionEnabled,
//     handleTransitionEnd,
//     preparedIndexesForPag,
//     isBlockArrow,
//     //  абстрагируем смену слайдов от внешнего мира
//     handlersForChangeSlide: {
//       handleGoNextSlide,
//       handleGoPrevSlide
//     },
//     // абстрагируем переключение автоплея слайдов от внешнего мира
//     handlersForAutoPlay: {
//       runAutoPlay: turnOnAutoPlay,
//       stopAutoPlay: turnOffAutoplay
//     }
//     ,
   
//   };
// };



export const useChangeSlide = <T>(
  slides: T[],
  {
    autoPlay,
    pagePaginationSize,
    infiniteLoop,
    quantityShowSlides = 1
  }: ChangeSlideSettings,
) => {
  // 1. Подготавливаем слайды с клонами
  // (абстрагировать логику клонирования - допустим если нам это не надо)
  const preparedSlides = useMemo(() => {
    if (slides.length === 0) return slides;
    if (infiniteLoop && slides.length >  quantityShowSlides) {
      // const maxIndexShow = slides.length - quantityShowSlides;
      
      const clonesFirstSlides = [];
      const clonesLastSlides = [];
      for(let i =0; i<quantityShowSlides; i++){
          clonesFirstSlides.push(slides[i])
          clonesLastSlides.push(slides[slides.length - 1- i])
      }
       clonesLastSlides.reverse();
      // return [slides[slides.length - 1], ...slides, slides[0]];
      const slidesWithClones = [...clonesLastSlides, ...slides, ...clonesFirstSlides];
      // console.log(slides.length);
      // console.log(slidesWithClones.length)
      // console.log(quantityShowSlides)
      return slidesWithClones

    } else {
      return slides;
    }
  }, [infiniteLoop, slides, quantityShowSlides]);
// редюсер состояния:
  const [stateSlider, dispatch] = useReducer(
    sliderReducer,
    // на основе 2 обхектаинициализируем состояние
    preparedSlides,
    // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
    (slidesPR: T[]) => {
      //  создадим изначальное состояние слайдера
      const initialStateSlider = createInitialStateSlider<T>();
      //  определим индекс  текущ показываемого слайда 
      //  если цикл бесконечный то покказываем index + кол-во показ слайдов
      const currentIndexSlide = infiniteLoop
        ? quantityShowSlides
        : 0;
        //  чтобы не вернуло infiniteLoop undefined приведем к булеву знанечению
      const currentIsRepeating = Boolean(infiniteLoop && slides.length > quantityShowSlides);
      //  выставляем параметры слайдера в зависимости от пропсов
      return {
        ...initialStateSlider,
        indexSlide: currentIndexSlide,
        lengthTrueSlides: slides.length,
        isRepeating: currentIsRepeating,
        transitionEnabled: true,
        preparedSlides: slidesPR,
      }
    },
  );
  //  следим за пропсами: 
  //  сколько наст слайдов
  //  необходима ли бесконеч карусель ?
  useEffect(()=>{
    // установим кол-во наст слайдов
    dispatch({
      type: SliderActionTypes.setTrueLengthSlides, 
      payload: slides.length});
     //  чтобы не вернуло infiniteLoop undefined приведем к булеву знанечению
      const currentIsRepeating = Boolean(infiniteLoop && slides.length > quantityShowSlides);
      //  установим нужна ли бесконеч лента
    dispatch({
      type: SliderActionTypes.setIsRepeating,
      payload: currentIsRepeating
    })
  },[slides, infiniteLoop, quantityShowSlides])

//  включаем анимацию по достиж опред условия:
  useEffect(()=>{
    if(stateSlider.isRepeating){
      if (
        stateSlider.indexSlide === quantityShowSlides ||
        stateSlider.indexSlide === stateSlider.lengthTrueSlides
      ) {
        dispatch({
          type: SliderActionTypes.setTransitionEnabled,
          payload: true
        })
      }
    }
},[
    stateSlider.indexSlide, 
    stateSlider.isRepeating,
    stateSlider.lengthTrueSlides,
    quantityShowSlides
  ]);

  // //  обновление слайдов(напр если они пришли с сервера снова)
  // useEffect(() => {
  //   dispatch({
  //     type: SliderActionTypes.setPreparedSlides,
  //     payload: preparedSlides,
  //   });
  // }, [preparedSlides]);

//  доработать!!!!!!!
  // если слайдер не бесконечный скрывам стрелку  если слайд первый или последний
  const isRightArrow = !infiniteLoop && stateSlider.indexSlide === 0;
  const isLeftArrow =
    !infiniteLoop &&
    stateSlider.indexSlide === stateSlider.preparedSlides.length - 1;
  const isBlockArrow = {
    isLeftArrow,
    isRightArrow,
  };
  // определим пагинацию
  
//  доработать!!!!!!!
  const preparedIndexesForPag = useMemo(() => {
    const currentIndexesPag = getPagIndexes(
      // бесконеч цикл это лишний первый или последний слайд
      // поэтому подстраиваем совпадение пагинации
      infiniteLoop ? stateSlider.indexSlide - 1 : stateSlider.indexSlide,
      pagePaginationSize || 3,
      slides.length,
    );
    return currentIndexesPag.map((dotIndex) =>
      infiniteLoop ? dotIndex + 1 : dotIndex,
    );
  }, [stateSlider.indexSlide, slides.length, pagePaginationSize, infiniteLoop]);

  //  отключить/включить автоматическое изменение картинок слайдера
  //  подготовка слайдов ксозданию 'бесконечной прокрутки'
  // const handleChangeSlide = useCallback((typeOperation: TypeOperationFlip) => {
  //   dispatch({ type: SliderActionTypes.changeSlide, payload: typeOperation });
  // }, []);
//  инкапсулируем логику переключения слайдов
  const handleGoNextSlide = useCallback(() => {
      // handleChangeSlide('increment');
      if(stateSlider.isRepeating || 
          stateSlider.indexSlide < (stateSlider.lengthTrueSlides - quantityShowSlides)
        ){
        dispatch({type: SliderActionTypes.setIndex, payload: stateSlider.indexSlide + 1})
      }
  }, [  
        stateSlider.isRepeating,
        stateSlider.indexSlide,
        stateSlider.lengthTrueSlides,
        quantityShowSlides,
      ]);

  const handleGoPrevSlide = useCallback(() => {
      // handleChangeSlide('decrement');
      if(stateSlider.isRepeating || stateSlider.indexSlide > 0){
         dispatch({type: SliderActionTypes.setIndex, payload: stateSlider.indexSlide - 1})
      }
  }, [ stateSlider.isRepeating,
        stateSlider.indexSlide,
      ]);

  const handleTransitionEnd = useCallback(() => {
    // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
    if(stateSlider.isRepeating) {
      if(stateSlider.indexSlide ===0){
        //  отключаем анимацию
        dispatch({
          type: SliderActionTypes.setTransitionEnabled,
          payload: false
        })
        //  переходим на индекс слайда
        dispatch({
          type: SliderActionTypes.setIndex,
          payload: stateSlider.lengthTrueSlides
        })
      } else if (stateSlider.indexSlide === stateSlider.lengthTrueSlides + quantityShowSlides){
          //  отключаем анимацию
          dispatch({
            type: SliderActionTypes.setTransitionEnabled,
            payload: false
          })
          //  переходим на индекс слайда
          dispatch({
            type: SliderActionTypes.setIndex,
            payload: quantityShowSlides
          })

      }
    }
    // dispatch({
    //   type: SliderActionTypes.setTransitionEnabled,
    //   payload: infiniteLoop || false,
    // });
  }, [stateSlider, quantityShowSlides]);

  //  можем сменить слайд на тот который нам нужно
  const setIndexSlide = useCallback((indexSlide: number) => {
    dispatch({ type: SliderActionTypes.setIndex, payload: indexSlide });
  }, []);

  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  обработчик для onMouseOn onMouseEnter
  //  useCallback 
  const handleToggleRunAutoPlayShowSlides = useCallback((flagAutoPlay: boolean) => {
    // console.log(stateSlader)
    dispatch({
      type: SliderActionTypes.toggleAutoPlay,
      payload: !flagAutoPlay, // Если пауза (true), то автоплей станет false (выключен)
    });
    
  },[]);
  // инкапсулируем логику включения или выключения состояния автоплея из состояния
  // всего слайдера
// включить автоплей
  const turnOnAutoPlay = useCallback(()=>{
     if(!autoPlay) return;
    handleToggleRunAutoPlayShowSlides(true);
  },[handleToggleRunAutoPlayShowSlides, autoPlay])
// выключить автоплей
    const turnOffAutoplay = useCallback(()=>{
     if(!autoPlay) return;
    handleToggleRunAutoPlayShowSlides(false);
  },[handleToggleRunAutoPlayShowSlides, autoPlay])



  return {
    indexSlide: stateSlider.indexSlide, // индексы:слайд текущий
    setIndexSlide, // для прыжка на люб слайд (пагинация)
    isAutoPlay: stateSlider.isAutoPlay,
    preparedSlides: stateSlider.preparedSlides,
    isAnimating: stateSlider.isAnimating,
    transitionEnabled: stateSlider.transitionEnabled,
    handleTransitionEnd,
    preparedIndexesForPag,
    isBlockArrow,
    //  абстрагируем смену слайдов от внешнего мира
    handlersForChangeSlide: {
      handleGoNextSlide,
      handleGoPrevSlide
    },
    // абстрагируем переключение автоплея слайдов от внешнего мира
    handlersForAutoPlay: {
      runAutoPlay: turnOnAutoPlay,
      stopAutoPlay: turnOffAutoplay
    }
    ,
   
  };
};
