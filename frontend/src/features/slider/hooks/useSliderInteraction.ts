import { useState } from "react";

type ArgsForInteractions = {
  pauseAutoPlay: ()=>void;
  resumeAutoPlay: ()=>void;
  enabled: boolean;
  //  обработка переключения слайдов
  forwardCallback:()=>void;
  backCallback:()=>void;
}


//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions =  ({pauseAutoPlay, resumeAutoPlay, enabled, forwardCallback, backCallback}:ArgsForInteractions )=>{
    // состояние для свайпов 
   const [pointerPosition, setPointerPosition] = useState<number | null>(null);
  //  эту функцию можно вывести в утилиты!!!
  //  обработчики остановки или возобновления автоплея мышкой






  
  
  type ArgsHandleAutoPlay = {
    eventName:string,
    callback: ()=>void,
    enabled:boolean,
  }

  const pointerHandleAutoPlay =  ({eventName, callback,enabled}:ArgsHandleAutoPlay)=>{
    if(!enabled) return;
    const eventsNames = ['touch', 'pen', 'mouse'];
    if(eventsNames.includes(eventName)) {
      callback();
    }
  }
  
    // если мышка над нашим объектом -останавливаем автоплей
  const mouseEnterHandleAutoPlay = (e:React.PointerEvent)=>{
    
    pointerHandleAutoPlay({eventName:e.pointerType, callback: pauseAutoPlay, enabled})
  }
  //  если мышка ушла с нашего объекта - возвращаем автоплей
const mouseLeaveHandleAutoPlay = (e:React.PointerEvent)=>{
    pointerHandleAutoPlay({eventName: e.pointerType, callback: resumeAutoPlay,  enabled })
  }


//  дотрунулся до объекта (регистрация события свайпа)
    //   тач прикосновение
    const touchDownHandleSwipeSlide = (e:React.PointerEvent)=>{
      //  игнорим первре прикосновение мыши 
         if(e.isPrimary &&
  (e.pointerType === "touch" || e.pointerType === "pen")){
          //  если это "первый" палец
         const pointerDown = e.clientX;
           
           setPointerPosition(pointerDown)
      }
    }

     const touchMoveHandleSwipeSlide = (e:React.PointerEvent) => {
      //  отключим свайпы для мышки так как у нас есть стрелки на слайдере для этого
      //  т е сделаем поведение переключения слайдов более предсказуемым
      if(pointerPosition === null || e.pointerType === 'mouse') return;
    
        // вычеслим текущую  горизон позицию
        const currentDirection =e.clientX;
        // console.log(currentDirection)
        // получим разницу  в зависимости от не будем листать слайд в лево или право
        const differencePositions = pointerPosition - currentDirection;
      //  разница мала создаст ложный автоплей
      if(differencePositions > 1){
        // листаем вправо
        forwardCallback();
      }
      if(differencePositions < -1){
        // листаем влево
        backCallback();
      }
      //  очищаем координату первого касания
        setPointerPosition(null)
    };

//  обработчики остановки или возобновления автоплея прикосновением
// дотронулись
 const touchDownHandleAutoPlay = (e:React.PointerEvent)=>{
      //    if(!enabled) return;
      // //  подумать как не смешивать логику
      //   //   работа автоплея
      //   if(e.pointerType === 'touch' || e.pointerType === 'pen') {
      //    pauseAutoPlay();
      //   }

        pointerHandleAutoPlay({eventName: e.pointerType, callback: pauseAutoPlay, enabled })
  }
  // свайпать мышкой не нужно!!!!!
// отпустили
  const touchUpHandleAutoPlay = (e:React.PointerEvent)=>{

      pointerHandleAutoPlay({eventName: e.pointerType, callback: resumeAutoPlay, enabled })

  }

//  главные обработчики

const handlePointerEnter = (e:React.PointerEvent)=>{
  //  навели мышку на границы объекта
    mouseEnterHandleAutoPlay(e);
}

    const handlePointerLeave = (e:React.PointerEvent)=>{
      //  убрали мышку с границ объекта
        mouseLeaveHandleAutoPlay(e);
    }
  // конец прикосновения
     const handlePointerUp  = (e:React.PointerEvent)=>{
      //  отпустили кокретную "точку" объекта
      touchUpHandleAutoPlay(e);
    }
    //  начало прикосновения
    const handlePointerDown = (e:React.PointerEvent)=>{
        //  регистрируем начало свайпа(свайпы слайдов)
        touchDownHandleSwipeSlide(e);
        //  остановка автоплея прикосновением - дотронулись до кокрент 
        //  точки объекта
        touchDownHandleAutoPlay(e);
    }
   const handlePointerMove = (e:React.PointerEvent)=>{
        //  произвели движения по слайду чтобв его сменить на разнице координат
        touchMoveHandleSwipeSlide(e);
    }
    

    //  отдельно handlerPointerCancel!!!
    const handlePointerCancel = ()=>{
      //  в любом случае восстановим автоплей
        resumeAutoPlay();
    }

  return {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerUp: handlePointerUp,
          onPointerDown: handlePointerDown,
          onPointerCancel: handlePointerCancel, // продумать расширить!!!!
          onPointerMove: handlePointerMove
        }
}