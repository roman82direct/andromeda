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
export const useSliderInteractions =  ({pauseAutoPlay, resumeAutoPlay, enabled, forwardCallback, backCallback}:ArgsForInteractions )=>{
    // состояние для свайпов 
   const pointerPositionRef = useRef<number | null>(null);
  //  эту функцию можно вывести в утилиты!!!
  //  обработчики остановки или возобновления автоплея мышкой
// если мышка над нашим объектом -останавливаем автоплей
  const mouseEnterHandleAutoPlay = (e:React.PointerEvent)=>{
    pointerHandleAutoPlay({pointerType:e.pointerType, callback: pauseAutoPlay, enabled, pointerTypes: POINTER_TYPE_MOUSE})
  }
  //  если мышка ушла с нашего объекта - возвращаем автоплей
const mouseLeaveHandleAutoPlay = (e:React.PointerEvent)=>{
  pointerHandleAutoPlay({pointerType: e.pointerType, callback: resumeAutoPlay,  enabled, pointerTypes: POINTER_TYPE_MOUSE })
  }


//  дотрунулся до объекта (регистрация события свайпа)
    //   тач прикосновение
    const touchDownHandleSwipeSlide = (e:React.PointerEvent)=>{
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

     const touchMoveHandleSwipeSlide = (e:React.PointerEvent) => {
      //  отключим свайпы для мышки так как у нас есть стрелки на слайдере для этого
      //  т е сделаем поведение переключения слайдов более предсказуемым
      if(pointerPositionRef.current === null || POINTER_TYPE_MOUSE.includes(e.pointerType)) return;
    
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
      if(differencePositions < - SWIPE_THRESHOLD){
        // листаем влево
        backCallback();
      }
      //  очищаем координату первого касания
        pointerPositionRef.current = null;
    };

//  обработчики остановки или возобновления автоплея прикосновением
// дотронулись
 const touchDownHandleAutoPlay = (e:React.PointerEvent)=>{
    pointerHandleAutoPlay({pointerType: e.pointerType, callback: pauseAutoPlay, enabled, pointerTypes:  TOUCH_POINTER_TYPES })
  }
  // свайпать мышкой не нужно!!!!!
// отпустили
  const touchUpHandleAutoPlay = (e:React.PointerEvent)=>{
      pointerHandleAutoPlay({pointerType: e.pointerType, callback: resumeAutoPlay, enabled, pointerTypes:  TOUCH_POINTER_TYPES })

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
      // элемент удерживает захват указателя ?
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        // снимаем захват 
        // "Если я захватил этот палец — отпускаю его" т е снимаю захват.
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      //  отпустили кокретную  первую "точку"  касания объекта(начало свайпа)
      touchUpHandleAutoPlay(e);
      // после эотпускания элемента сравниваем касания чтобыследать свайп
      touchMoveHandleSwipeSlide(e);
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
      //  сбрасиываем первую координату свайпа 
      pointerPositionRef.current = null;
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