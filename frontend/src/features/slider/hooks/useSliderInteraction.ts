import { useRef } from "react";
import { pointerHandleAutoPlay } from "../utils/pointerHandleAutoPlay";



//  в каких случах здесь уместно убирать захват событие на кокретном целевом элементе
//  много обработчиков остановки и возоюноаления автоплея - разберись с этим
//  тест на открытие карточки !!!


type ArgsForInteractions = {
  // автоплей
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  enabled: boolean;
  //  обработка переключения слайдов
  forwardCallback: () => void;
  backCallback: () => void;
};
// настройки событий 
const POINTER_TYPE_MOUSE = ["mouse"];
const TOUCH_POINTER_TYPES = ["touch", "pen"];
const ALL_POINTER_TYPES = [...POINTER_TYPE_MOUSE, ...TOUCH_POINTER_TYPES];
const SWIPE_THRESHOLD = 30;

//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions = ({
  pauseAutoPlay,
  resumeAutoPlay,
  enabled,
  forwardCallback,
  backCallback,
}: ArgsForInteractions) => {
  // состояние для свайпов
  const pointerPositionRef = useRef<number | null>(null);
  //  эту функцию можно вывести в утилиты!!!
  //  обработчики остановки или возобновления автоплея мышкой
  // если мышка над нашим объектом -останавливаем автоплей
  
  
  //  переименовать обработчики !!!!
  const stopHandleAutoPlay = (e: React.PointerEvent<HTMLDivElement>)=>(
    {stopAutoPlay, pointerTypes}:{stopAutoPlay:()=> void, pointerTypes:string[]}
  ) => {
    pointerHandleAutoPlay({
      pointerType: e.pointerType,
      callback: stopAutoPlay,
      enabled,
      pointerTypes: pointerTypes,
    });
  };
  //  если мышка ушла с нашего объекта - возвращаем автоплей
  const startHandleAutoPlay = (e: React.PointerEvent<HTMLDivElement>)=>(
    {runAutoPlay, pointerTypes}:{runAutoPlay:()=>void, pointerTypes:string[]}
  ) => {
    pointerHandleAutoPlay({
      pointerType: e.pointerType,
      callback: runAutoPlay,
      enabled,
      pointerTypes: pointerTypes,
    });
    // console.log('mouseleave')
  };

  //  дотрунулся до объекта (регистрация события свайпа)
  //   тач прикосновение
  const handleSwipeSlideStart = (e: React.PointerEvent<HTMLDivElement>) => {
    // console.log('start swip')
    //  игнорим первре прикосновение мыши
    if (
      e.isPrimary &&
      TOUCH_POINTER_TYPES.includes(e.pointerType)
      // (e.pointerType === "touch" || e.pointerType === "pen")
    ) {
      //  если это "первый" палец
      //  захватываем указатель при начале жеста -
      // чтобы гаранзитровано получить все события пальца (даже если палец ушел за границы элемента)
      e.currentTarget.setPointerCapture(e.pointerId);
      // запоминаем первую координату
      const pointerDown = e.clientX;
      pointerPositionRef.current = pointerDown;
      // setPointerPosition(pointerDown)
    }
    // console.log('touch')
  };

  const handleSwipeSlideEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    //  console.log('end swip')
    //  отключим свайпы для мышки так как у нас есть стрелки на слайдере для этого
    //  т е сделаем поведение переключения слайдов более предсказуемым
    //  если указатель не является в списке событий TOUCH_POINTER_TYPES не ьудем ничего делать
    //  и если не первое прикосновение
    if (
      !e.isPrimary ||
      pointerPositionRef.current === null ||
      !TOUCH_POINTER_TYPES.includes(e.pointerType)
    )
     { 
      // 
      pointerPositionRef.current = null;
      return;
    }

    // вычеслим текущую  горизон позицию
    const currentDirection = e.clientX;
    // console.log(currentDirection)
    // получим разницу  в зависимости от не будем листать слайд в лево или право
    const differencePositions = pointerPositionRef.current - currentDirection;
    //  разница мала создаст ложный автоплей
    if (differencePositions > SWIPE_THRESHOLD) {
      // листаем вправо
      forwardCallback();
    } else if (differencePositions < -SWIPE_THRESHOLD) {
      // листаем влево
      backCallback();
    }
    //  очищаем координату первого касания
    pointerPositionRef.current = null;

 
  };

  //  главные обработчики

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    //  навели мышку на границы объекта
    //  чтобы остановить автоплей
    stopHandleAutoPlay(e)({
                            stopAutoPlay: pauseAutoPlay, 
                            pointerTypes: POINTER_TYPE_MOUSE 
                        });
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    //  убрали мышку с границ объекта
    //  возобнолвяем автоплей
    startHandleAutoPlay(e)({
                            runAutoPlay: resumeAutoPlay,
                            pointerTypes: POINTER_TYPE_MOUSE
                          });
  };
  // конец прикосновения
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
       // если элемент удерживает захват указателя  то снимаем его
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      // снимаем захват
      // "Если я захватил этот палец — отпускаю его" т е снимаю захват.
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    //  после отпускания тача запускаем ленту
    // возобновляем автоплей
   
     console.log("UP", {
    target: e.target,
    currentTarget: e.currentTarget,
    pointerId: e.pointerId,
    pointerType: e.pointerType,
    isPrimary: e.isPrimary,
  })
    
      startHandleAutoPlay(e)({
                            runAutoPlay: resumeAutoPlay,
                            pointerTypes: TOUCH_POINTER_TYPES
                          });
    //  отпустили кокретную  первую "точку"  касания объекта(начало свайпа)
    // после эотпускания элемента сравниваем касания чтобыследать свайп
    handleSwipeSlideEnd(e);
  };
  //  начало прикосновения
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    //  останавливаем движение ленты зажатием пальцы на ленте
      // stopHandleAutoPlay(e);
     console.log("DOWN", {
      target: e.target,
      currentTarget: e.currentTarget,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      isPrimary: e.isPrimary,
});
    //  регистрируем начало свайпа(свайпы слайдов)
    handleSwipeSlideStart(e);
    //  остановка автоплея прикосновением - дотронулись до кокрент
    //  точки объекта
     stopHandleAutoPlay(e)({
                            stopAutoPlay: pauseAutoPlay, 
                            pointerTypes: TOUCH_POINTER_TYPES 
                        });
  };

  //  отдельно handlerPointerCancel!!!
  const handlePointerCancel = (e:React.PointerEvent<HTMLDivElement>) => {
    
    console.log("CANCEL", {
      target: e.target,
      currentTarget: e.currentTarget,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      isPrimary: e.isPrimary,
  });
    //  в любом случае возобновляем автоплей как дефолтное состояние 
    if(ALL_POINTER_TYPES.includes(e.pointerType)){
      resumeAutoPlay();
    }
    
    //  сбрасиываем первую координату свайпа
    pointerPositionRef.current = null;
  };

  return {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerUp: handlePointerUp,
    onPointerDown: handlePointerDown,
    onPointerCancel: handlePointerCancel, // продумать расширить!!!!
  };
};
