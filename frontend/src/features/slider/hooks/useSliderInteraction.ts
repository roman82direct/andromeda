import { useRef } from "react";
import { pointerHandleAutoPlay } from "../utils/pointerHandleAutoPlay";

type ArgsForInteractions = {
  // автоплей
  pauseAutoPlay: ()=>void;
  resumeAutoPlay: ()=>void;
  enabled: boolean;
  //  обработка переключения слайдов
  forwardCallback:()=>void;
  backCallback:()=>void;
};

const POINTER_TYPE_MOUSE = [ 'mouse'];
const TOUCH_POINTER_TYPES = ['touch', 'pen'];
const SWIPE_THRESHOLD = 1;

//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions =  ({
  pauseAutoPlay, 
  resumeAutoPlay, 
  enabled, 
  forwardCallback, 
  backCallback, 
}:ArgsForInteractions )=>{
    // состояние для свайпов 
   const pointerPositionRef = useRef<number | null>(null);
  //  эту функцию можно вывести в утилиты!!!
  //  обработчики остановки или возобновления автоплея мышкой
// если мышка над нашим объектом -останавливаем автоплей
  const mouseEnterHandleAutoPlay = (e:React.PointerEvent<HTMLDivElement>)=>{
    pointerHandleAutoPlay({pointerType:e.pointerType, callback: pauseAutoPlay, enabled, pointerTypes: POINTER_TYPE_MOUSE})
  }
  //  если мышка ушла с нашего объекта - возвращаем автоплей
const mouseLeaveHandleAutoPlay = (e:React.PointerEvent<HTMLDivElement>)=>{
  pointerHandleAutoPlay({pointerType: e.pointerType, callback: resumeAutoPlay,  enabled, pointerTypes: POINTER_TYPE_MOUSE })
  }


//  дотрунулся до объекта (регистрация события свайпа)
    //   тач прикосновение
    const handleSwipeSlideStart = (e:React.PointerEvent<HTMLDivElement>)=>{
      console.log('start swip')
      //  игнорим первре прикосновение мыши 
         if(e.isPrimary &&
          TOUCH_POINTER_TYPES.includes(e.pointerType)
  // (e.pointerType === "touch" || e.pointerType === "pen")
  ){
      //  если это "первый" палец
    //  захватываем указатель при начале жеста - 
    // чтобы гаранзитровано получить все события пальца (даже если палец ушел за границы элемента)
      e.currentTarget.setPointerCapture(e.pointerId)
      // запоминаем первую координату
      const pointerDown = e.clientX;
      pointerPositionRef.current = pointerDown;
      // setPointerPosition(pointerDown)
      }
    }

     const handleSwipeSlideEnd = (e:React.PointerEvent<HTMLDivElement>) => {
       console.log('end swip')
      //  отключим свайпы для мышки так как у нас есть стрелки на слайдере для этого
      //  т е сделаем поведение переключения слайдов более предсказуемым
      //  если указатель не является в списке событий TOUCH_POINTER_TYPES не ьудем ничего делать
      //  и если не первое прикосновение
      if(
        !e.isPrimary ||
        pointerPositionRef.current === null ||  
        !TOUCH_POINTER_TYPES.includes(e.pointerType)
       ) return;
    
        // вычеслим текущую  горизон позицию
        const currentDirection =e.clientX;
        // console.log(currentDirection)
        // получим разницу  в зависимости от не будем листать слайд в лево или право
        const differencePositions = pointerPositionRef.current - currentDirection;
      //  разница мала создаст ложный автоплей
      if(differencePositions > SWIPE_THRESHOLD){
        // листаем вправо
        forwardCallback();
      }
       else if(differencePositions < - SWIPE_THRESHOLD){
        // листаем влево
        backCallback();
      }
      //  очищаем координату первого касания
        pointerPositionRef.current = null;

      // если элемент удерживает захват указателя  то снимаем его
      // if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      //   // снимаем захват 
      //   // "Если я захватил этот палец — отпускаю его" т е снимаю захват.
      //   e.currentTarget.releasePointerCapture(e.pointerId);
      // }
       
    };

//  обработчики остановки или возобновления автоплея прикосновением
// дотронулись
 const touchDownHandleAutoPlay = (e:React.PointerEvent<HTMLDivElement>)=>{
    pointerHandleAutoPlay({pointerType: e.pointerType, callback: pauseAutoPlay, enabled, pointerTypes:  TOUCH_POINTER_TYPES })
  }
  // свайпать мышкой не нужно!!!!!
// отпустили
  const touchUpHandleAutoPlay = (e:React.PointerEvent<HTMLDivElement>)=>{
      pointerHandleAutoPlay({pointerType: e.pointerType, callback: resumeAutoPlay, enabled, pointerTypes:  TOUCH_POINTER_TYPES })

  }

//  главные обработчики

const handlePointerEnter = (e:React.PointerEvent<HTMLDivElement>)=>{
  //  навели мышку на границы объекта
    mouseEnterHandleAutoPlay(e);
}

    const handlePointerLeave = (e:React.PointerEvent<HTMLDivElement>)=>{
      //  убрали мышку с границ объекта
        mouseLeaveHandleAutoPlay(e);
    }
  // конец прикосновения
     const handlePointerUp  = (e:React.PointerEvent<HTMLDivElement>)=>{
      

      //  отпустили кокретную  первую "точку"  касания объекта(начало свайпа)
      touchUpHandleAutoPlay(e);
      // после эотпускания элемента сравниваем касания чтобыследать свайп
      handleSwipeSlideEnd(e);
    }
    //  начало прикосновения
    const handlePointerDown = (e:React.PointerEvent<HTMLDivElement>)=>{
        //  регистрируем начало свайпа(свайпы слайдов)
        handleSwipeSlideStart(e);
        //  остановка автоплея прикосновением - дотронулись до кокрент 
        //  точки объекта
        touchDownHandleAutoPlay(e);
    }


    //  отдельно handlerPointerCancel!!!
    const handlePointerCancel = ()=>{
      //  в любом случае восстановим автоплей
      resumeAutoPlay();
      //  сбрасиываем первую координату свайпа 
      pointerPositionRef.current = null;
    }

  return {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerUp: handlePointerUp,
          onPointerDown: handlePointerDown,
          onPointerCancel: handlePointerCancel, // продумать расширить!!!!
          
        }
}