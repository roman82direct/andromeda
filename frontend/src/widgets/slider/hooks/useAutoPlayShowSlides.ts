import { useEffect, useRef } from "react";
import type { TAutoPlaySetting } from "../types";

export const useAutoPlayShowSlides = (
  {
    indexSlide,
    infiniteLoop,
    autoPlay,
    slidesArrLength,
    autoPlayTime,
    isAutoPlayState,
    dispatch

  }:TAutoPlaySetting )=>{
      //  используем направления автоплея если цикл не бесконечный
      const directionRef = useRef(true);
    //  сделать отдельный хук для автоплея
      useEffect(() =>{
       //  меняем направления автоплея если слайдер достиг первого или послед слайда
      //   
      // чтобылишний раз юзэффект не работал если стоит бесконечнй цикл или автоплея нет
      //  нам этот юзэффект не нужен 
      if(infiniteLoop || !autoPlay) return;

         if(indexSlide ===  slidesArrLength-1){
                    directionRef.current = false
                }
        if(indexSlide ===0){
          directionRef.current = true

        }
      },[
        indexSlide,
        slidesArrLength,
        infiniteLoop,
        autoPlay
        ])
      //  автоматич показ слайдов
      useEffect(() => {
        // autoPlay  переменная должна задаваться обработчиком и если это нужно нам
        // если прогрмно автоматич смена слайдов отключена  или мышка на слайде
        if (!autoPlay || !isAutoPlayState) return;
        let intervalIdAutoPlay: ReturnType<typeof setInterval>;
        
        if(infiniteLoop){
          intervalIdAutoPlay = setInterval(()=>{
            dispatch({type:'CHANGE_SLIDE', payload:'increment'});
    
          },autoPlayTime)
        } else {
    //  проблема каждый раз при смене слайда создается новый таймер
          intervalIdAutoPlay = setInterval(()=>{
    //  в зависимости от флага направления меняем смену слайда в ту или иную сторону
                if( directionRef.current){
                         dispatch({type:'CHANGE_SLIDE', payload:'increment'});
                } 
                 if(!directionRef.current){
                dispatch({type:'CHANGE_SLIDE', payload:'decrement'});
                
              }
          },autoPlayTime)
            
        }  
        return () => {
          clearInterval(intervalIdAutoPlay);
        };
      }, [
          autoPlayTime, 
          autoPlay, 
          isAutoPlayState,
          infiniteLoop,
          dispatch
        ]);
}