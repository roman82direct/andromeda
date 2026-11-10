import { useCallback, useEffect, useRef } from "react";
import { startHandleAutoPlay, stopHandleAutoPlay } from "../utils/pointersHandlers";
import { doSwipeBetweenTwoDots, defineEdgePosition, recordCoordinateFirstTouch } from "../utils/swipe";

// !!!!!нужен ли здесь вообще захват указателя ?
// https://learn.javascript.ru/coordinates  изучить
// https://chatgpt.com/c/6ad35944-1f58-83ed-86b1-a6b299828b72
// e.currentTarget.getBoundingClientRect() !!!!



type ArgsForInteractions = {
  // автоплей
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  // тумблер
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
const ENTRY_SIZE_EDGE_SLIDER = 30;

//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions = ({
  pauseAutoPlay,
  resumeAutoPlay,
  enabled,
  forwardCallback,
  backCallback,
}: ArgsForInteractions) => {
    //  интервал запуска слайдера (для множестве тача)

const edgeCallbackRef = useRef<(() => void) | null>(null);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);//   определяем направление движения свайпа
  const stopEdgeInterval = ()=>{
      const idIntervel = intervalRef.current
    if( idIntervel!== null){
      clearInterval(idIntervel)
      intervalRef.current = null
    }
  }


  useEffect(()=>{
    edgeCallbackRef.current = forwardCallback;
  },[forwardCallback])
  const startEdgeInterval =() => {
    console.log('ffff')
    //  обновление коллбека чтобы не мешало старое состояние редюсера
  if (intervalRef.current !== null) return;
      if( !edgeCallbackRef.current) return
  intervalRef.current = setInterval(()=>{
     console.log('timer tick');
     if( edgeCallbackRef.current){
      edgeCallbackRef.current();
     }
    
    // console.log(
    //   'running'
    // )
    console.log('callback called');
  }, 1000);
};


  // состояние для свайпов
  const startXRef = useRef<number | null>(null);

// вынести  в утилиты
  // определить свайп это или просто тач к примеру с целью остановить ленту
  const handleTouchSwipe = (e: React.PointerEvent<HTMLElement>)=>{
    //  оставим это для move ?
    //  если это не первый палец или реф первой координат тача отсутсвует или устройсов ввода не распознано
    if (
      !e.isPrimary ||
      startXRef.current === null ||
      !TOUCH_POINTER_TYPES.includes(e.pointerType) 
      )
     { 
      // 
      startXRef.current = null;
      return;
    }

    // выяисляем тек горизонт позицию
    const currentDirection = e.clientX;
    //  считаем разницу чтобы понять нужен ли нам перелистивыние ленты слайдера вообще ?
    const swiping = doSwipeBetweenTwoDots(
      {
      currentCoordinate:currentDirection,  
      lastCoordinate:startXRef.current,
     }, 
      forwardCallback,
      backCallback,
      SWIPE_THRESHOLD
    )

if(swiping && startXRef.current!==null) {
  //  обновляем координату если свайп продолжается без "отпускания"
   startXRef.current = e.clientX
} 
  }

  

  //  главные обработчики
  //  для мышки
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    //  навели мышку на границы объекта
    //  чтобы остановить автоплей
    stopHandleAutoPlay(e)({
                            stopAutoPlay: pauseAutoPlay, 
                            pointerTypes: POINTER_TYPE_MOUSE 
                        }, enabled);
                  
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    //  убрали мышку с границ объекта
    //  возобнолвяем автоплей
    startHandleAutoPlay(e)({
                            runAutoPlay: resumeAutoPlay,
                            pointerTypes: POINTER_TYPE_MOUSE
                          },enabled);
  };
  // конец прикосновения
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
       // если элемент удерживает захват указателя  то снимаем его
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      // снимаем захват
      // "Если я захватил этот палец — отпускаю его" т е снимаю захват.
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    //  возобновляем автоплей
      startHandleAutoPlay(e)({
                            runAutoPlay: resumeAutoPlay,
                            pointerTypes: TOUCH_POINTER_TYPES
                          },enabled);

    //  очищаем координату первого касания
    startXRef.current = null;
    // isSwipingRef.current = false;
    //   stopEdgeInterval 
    stopEdgeInterval()

    
  };
  //  начало прикосновения
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 1. запоминаем первую координату 
    const recordingCoordinateX = recordCoordinateFirstTouch(e, TOUCH_POINTER_TYPES, );
    startXRef.current = recordingCoordinateX
    // 2. остановка автоплея прикосновением - дотронулись до кокрент
    stopHandleAutoPlay(e)({
                          stopAutoPlay: pauseAutoPlay, 
                          pointerTypes: TOUCH_POINTER_TYPES 
                      },enabled);
                    


  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        // console.log(e.currentTarget.getBoundingClientRect());

      // const sliderWindowCoordinates =  e.currentTarget.getBoundingClientRect();
      //  const  leftEdgeSlider = sliderWindowCoordinates.x;
      //  const  rightEdgeSlider = sliderWindowCoordinates.x + sliderWindowCoordinates.width
      //   console.log(leftEdgeSlider)
      //   console.log(e.clientX);
      //   console.log(rightEdgeSlider)
      //  handleTouchSwipe(e);!
      // doSwipeByEdge(e, { forwardCallback,backCallback  })
        const edgePosition = defineEdgePosition(e);

 if (edgePosition.isNearLeftEdge) {
  console.log(';;;')
    startEdgeInterval();
  } else if (edgePosition.isNearRightEdge) {
    startEdgeInterval();
  } else {
    //  это нужно ли ?
    // stopEdgeInterval();
  }
//  мешала эта строчка ?
//  startEdgeInterval();
   
  } 

  //  отдельно handlerPointerCancel!!!
  const handlePointerCancel = (e:React.PointerEvent<HTMLDivElement>) => {
    //  в любом случае возобновляем автоплей как дефолтное состояние 
    if(ALL_POINTER_TYPES.includes(e.pointerType)){
      resumeAutoPlay();
    }
    
    //  сбрасиываем первую координату свайпа
    startXRef.current = null;

      //   stopEdgeInterval 
    stopEdgeInterval()
  };

  return {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerUp: handlePointerUp,
    onPointerDown: handlePointerDown,
    onPointerCancel: handlePointerCancel, 
    onPointerMove: handlePointerMove
  };
};
