import type { TConfigChangeSlide, TSlideItem} from "../types";
import { useCallback,   useMemo, useReducer, useEffect} from "react";
import type { TActionSlide } from "../types";
import { getPagIndexes } from "../utils/getPagIndexes";
import { initialStateSlider, sliderReducer } from "../model/sliderReducer";
import { useAutoPlayShowSlides } from "./useAutoPlayShowSlides";





export const useChangeSlide = (
  slides: TSlideItem[], 
  {
    autoPlay, 
    autoPlayTime,
    pagePaginationSize,
    infiniteLoop
  }:TConfigChangeSlide 
) => {

  // 1. Подготавливаем слайды с клонами 
  // (абстрагировать логику клонирования - допустим если нам это не надо)

  const preparedSlides = useMemo(()=>{
    if (slides.length === 0) return [];
    if(infiniteLoop){
      return [slides[slides.length-1], ...slides, slides[0]];
    }else{
      return slides
    }
  },[infiniteLoop, slides])


  const [stateSlader, dispatch] = useReducer(
    sliderReducer, 
    // на основе 2 обхектаинициализируем состояние 
    preparedSlides,
    // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
    (slides)=>{
      const currentIndexSlide =  infiniteLoop ? initialStateSlider.indexSlide + 1 : initialStateSlider.indexSlide;
      return {
        ...initialStateSlider,
        indexSlide:currentIndexSlide,
        preparedSlides:slides
      }
    }
  )


  //  обновление слайдов(напр если они пришли с сервера снова)
  useEffect(()=>{
      dispatch({
        type:'SET_PREPARED_SLIDES',
        payload: preparedSlides 
      })
  },[preparedSlides])

// если слайдер не бесконечный скрывам стрелку  если слайд первый или последний
  const isRightArrow =  !infiniteLoop && stateSlader.indexSlide === 0;
  const isLeftArrow = !infiniteLoop &&  stateSlader.indexSlide === stateSlader.preparedSlides.length-1;
  const isBlockArrow = {
    isLeftArrow,
    isRightArrow
  }
 // определим пагинацию
  
  const preparedIndexesForPag = useMemo(()=>{
    const currentIndexesPag = getPagIndexes(
      // бесконеч цикл это лишний первый или последний слайд
      // поэтому подстраиваем совпадение пагинации
      infiniteLoop ? stateSlader.indexSlide-1 : stateSlader.indexSlide, 
      pagePaginationSize || 3, 
      slides.length
    );
    return currentIndexesPag.map((dotIndex)=>(
        infiniteLoop ? dotIndex+1 : dotIndex
  ))},[stateSlader.indexSlide, slides.length, pagePaginationSize,infiniteLoop])
  
 //  отключить/включить автоматическое изменение картинок слайдера
//  подготовка слайдов ксозданию 'бесконечной прокрутки'
 const handleChangeSlide = useCallback(
    (typeOperation: TActionSlide) => {
      
      dispatch({type:'CHANGE_SLIDE',payload:typeOperation})
    },
    [],
  );

  const handleTransitionEnd = useCallback( ()=>{
    // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
    dispatch({type:'TRANSITION_END', payload: infiniteLoop || false})
},[infiniteLoop])

//  можем сменить слайд на тот который нам нужно
  const setIndexSlide = useCallback((indexSlide:number)=>{
    dispatch({type:'SET_INDEX', payload:indexSlide})
  }, [])
  
  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  обработчик для onMouseOn onMouseEnter 
  const handleToggleRunAutoPlayShowSlides = ()=>{
    dispatch({type:'TOGGLE_AUTOPLAY', payload: !stateSlader.isAutoPlay})
  }
//  работа автопоказа слайдов
  useAutoPlayShowSlides(
    {
      indexSlide: stateSlader.indexSlide,
      infiniteLoop,
      autoPlay,
      slidesArrLength: stateSlader.preparedSlides.length,
      autoPlayTime,
      isAutoPlayState: stateSlader.isAutoPlay,
      dispatch
    }
  )

  return {
    indexSlide: stateSlader.indexSlide, // индексы:слайд текущий
    setIndexSlide, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    preparedSlides: stateSlader.preparedSlides,
    isAnimating: stateSlader.isAnimating,
    transitionEnabled: stateSlader.transitionEnabled,  
    handleTransitionEnd,
    preparedIndexesForPag,
    // для автом смены слайда
    toggleAutoPlayChangeSlide:handleToggleRunAutoPlayShowSlides,
    isBlockArrow
  };
};


