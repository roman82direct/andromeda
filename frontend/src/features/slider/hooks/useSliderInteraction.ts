import { useRef } from "react";
import { pointerHandleAutoPlay } from "../utils/pointerHandleAutoPlay";
import { defineSwipeDirection } from "../utils/defineSwipeDirection";



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
  const startXRef = useRef<number | null>(null);
// const directionRef = useRef<"left" | "right" | null>(null);
// const isSwipingRef = useRef<boolean>(false);
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


//   определяем направление движения свайпа
// вынести  в утилиты

  const recordCoordinateFirstTouch = (e: React.PointerEvent<HTMLElement>) => {
    //  для события down 
    //   здесь запомним координату перввого касания
      if (
      e.isPrimary &&
      TOUCH_POINTER_TYPES.includes(e.pointerType)
      // (e.pointerType === "touch" || e.pointerType === "pen")
      ) {
          //  если это "первый" палец
          // запоминаем первую координату
          const pointerDown = e.clientX;
        
          startXRef.current = pointerDown;
          // isSwipingRef.current = false;
        }

  };
  // определить свайп это или просто тач к примеру с целью остановить ленту
  const handleSwipeOrTouch = (e: React.PointerEvent<HTMLElement>)=>{
    //  оставим это для move ?
    //  если это не первый палец или реф первой координат тача отсутсвует или устройсов ввода не распознано
    if (
      !e.isPrimary ||
      startXRef.current === null ||
      !TOUCH_POINTER_TYPES.includes(e.pointerType) 
    
      //  || lastSwitchXRef.current === null
      // isSwipingRef.current
      )
     { 
      // 
      startXRef.current = null;
      return;
    }

    // выяисляем тек горизонт позицию
    const currentDirection = e.clientX;
    //  определим разницу первой и тек координат
    const differencePositions = startXRef.current - currentDirection;
    // lastSwitchXRef.current = currentDirection
    console.log(defineSwipeDirection({
      currentCoordinateX: e.clientX, 
      lastCoordinateX:  startXRef.current 
    }))
    //  определим свайп ли это или простой тач
    //  те пересёк ли жест порог свайпа
    console.log(`текущ ${currentDirection}, первая ${startXRef.current}, разница ${differencePositions}`)

      //  мы поняли что это не просто тач а начало свайпа
      // чтобы гаранзитровано получить все события пальца (даже если палец ушел за границы элемента)
      // e.currentTarget.setPointerCapture(e.pointerId);
     
      if (differencePositions > SWIPE_THRESHOLD) {
        // листаем вправо
        forwardCallback();
        //  обновляем координату первого касания
         startXRef.current = e.clientX;
          // isSwipingRef.current = true
        console.log(`${differencePositions} больше ${ SWIPE_THRESHOLD}`)
      
        // console.log('to left')
    } else if (differencePositions < - SWIPE_THRESHOLD) {
        // листаем влево
        backCallback();
        console.log(`${differencePositions} меньше минус  ${ SWIPE_THRESHOLD}`)
        // console.log('to right')
        //  обновляем координату первого касания
        startXRef.current = e.clientX;
          // isSwipingRef.current = true
    }
  //  если мы изменили движение мы должнв обновить действие

  }

  

  //  главные обработчики
  //  для мышки
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
   
  //    console.log("UP", {
  //   target: e.target,
  //   currentTarget: e.currentTarget,
  //   pointerId: e.pointerId,
  //   pointerType: e.pointerType,
  //   isPrimary: e.isPrimary,
  // })
    //  возобновляем автоплей
      startHandleAutoPlay(e)({
                            runAutoPlay: resumeAutoPlay,
                            pointerTypes: TOUCH_POINTER_TYPES
                          });
    //  отпустили кокретную  первую "точку"  касания объекта(начало свайпа)
    // после эотпускания элемента сравниваем касания чтобыследать свайп
    // handleSwipeSlideEnd(e);
    //  очищаем координату первого касания
    startXRef.current = null;
    // isSwipingRef.current = false;
  };
  //  начало прикосновения
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    //  останавливаем движение ленты зажатием пальцы на ленте
      // stopHandleAutoPlay(e);
//      console.log("DOWN", {
//       target: e.target,
//       currentTarget: e.currentTarget,
//       pointerId: e.pointerId,
//       pointerType: e.pointerType,
//       isPrimary: e.isPrimary,
// });
    //  регистрируем начало свайпа(свайпы слайдов)
    // handleSwipeSlideStart(e);
    // 1. запоминаем первую координату 
    recordCoordinateFirstTouch(e);
    // 2. остановка автоплея прикосновением - дотронулись до кокрент
    stopHandleAutoPlay(e)({
                          stopAutoPlay: pauseAutoPlay, 
                          pointerTypes: TOUCH_POINTER_TYPES 
                      });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
//         console.log("MOVE", {
//       target: e.target,
//       currentTarget: e.currentTarget,
//       pointerId: e.pointerId,
//       pointerType: e.pointerType,
//       isPrimary: e.isPrimary,
// });
        // console.log(defineSwipeDirection(e))
        handleSwipeOrTouch(e);
  }

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
    startXRef.current = null;
    // isSwipingRef.current = false;
  };

  return {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerUp: handlePointerUp,
    onPointerDown: handlePointerDown,
    onPointerCancel: handlePointerCancel, // продумать расширить!!!!

    onPointerMove: handlePointerMove
  };
};
