import { useCallback, useEffect, useRef } from "react";
import { startHandleAutoPlay, stopHandleAutoPlay } from "../utils/pointersHandlers";
import { doSwipeBetweenTwoDots, defineEdgePosition, recordCoordinateFirstTouch } from "../utils/swipe";

// !!!!!нужен ли здесь вообще захват указателя ?
// https://learn.javascript.ru/coordinates  изучить
// https://chatgpt.com/c/6ad35944-1f58-83ed-86b1-a6b299828b72
// e.currentTarget.getBoundingClientRect() !!!!

//  замечания
// 1. в слайдере перепутаны направления при работе с разными функциями
// 2. код слишком сцеплен:
//  необходиморазделение устройств
//  разделение обычного свайпа и свайпа у края, который реализован через интервал
//  3. при зажатии у края не учтено в какую стороу мы свайп делаем 
// => необходима работа над разницей точек

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
const ENTRY_SIZE_EDGE_SLIDER = 48;

//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions = ({
  pauseAutoPlay,
  resumeAutoPlay,
  enabled,
  forwardCallback,
  backCallback,
}: ArgsForInteractions) => {
// состояние для свайпов - работа с первой координатой касания
//  например а нажат ли палец
const startXRef = useRef<number | null>(null);

// const edgeCallbackRef = useRef<(() => void) | null>(null);
const edgeDirectionRef = useRef<'left' | 'right' | null>(null);

const forwardRef = useRef<(()=>void) | null>(null);

const backRef = useRef<(()=>void) | null>(null);

const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);//   определяем направление движения свайпа

const stopEdgeInterval = ()=>{
      const idIntervel = intervalRef.current
    if( idIntervel!== null){
      clearInterval(idIntervel)
      intervalRef.current = null
    }
    // сбрасываем направление
    edgeDirectionRef.current = null;
  }

//  обновляем коллбэк чтобы не было устаревшего замыкания 
//  //  при размонтировании очищаем таймер 
useEffect(()=>{
  forwardRef.current = forwardCallback
  backRef.current =  backCallback;
  return(()=>{
    // в люб случае при размонтировании убираем таймер
    //  stopEdgeInterval();
  })
},[forwardCallback,  backCallback])

    type TDirectionTo ='left' | 'right';

 const startEdgeInterval =(directionTo:   TDirectionTo) => {
   console.log('startEdgeInterval');
    //  если интервал смен слайда уже запущен  и напрвление известно и не изменилось - ничего не делаем
    //  чтобы не плодить лишние таймеры
    if (intervalRef.current !== null && edgeDirectionRef.current === directionTo) return;
    //   если направление сменилось 
    //  остановка старого предыдущего таймера направления  интервала
    // stopEdgeInterval();
    //  обновляем направление
    edgeDirectionRef.current = directionTo
  intervalRef.current = setInterval(()=>{
       console.log('startInterval');
     if( backRef.current && directionTo === 'right'){
      console.log('right')
      backRef.current();
      
     }
     if(forwardRef.current && directionTo == 'left'){
      forwardRef.current();
      
      console.log('left')
     }  
  }, 600);
};




// вынести  в утилиты
  // определить свайп это или просто тач к примеру с целью остановить ленту
  const handleTouchSwipe = (e: React.PointerEvent<HTMLElement>)=>{
    //  оставим это для move ?
    //  если это не первый палец или реф первой координат тача отсутсвует или устройсов ввода не распознано
    if (
      // это не первое касание
      !e.isPrimary ||
      //  или палец не нажат
      startXRef.current === null ||
      //  защита от непредвиденных устройств напр мыши
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
                          // останавливаем интервал
    // stopEdgeInterval()
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
    //  остановка движения лента слайдера по краю
    stopEdgeInterval()

    
  };
  //  начало прикосновения
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    //  необходим захват указателя!!!
    e.currentTarget.setPointerCapture(e.pointerId)


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
     

  const edgePosition = defineEdgePosition(e, ENTRY_SIZE_EDGE_SLIDER);

    //  защита от мыши - подумать ?? а если нам нужна будет здесь мышь длячего то ??
 // и  если палец не нажат
  // if (!TOUCH_POINTER_TYPES.includes(e.pointerType) ||
  //     startXRef.current === null
  
  
  // ) return;
 
    console.log(edgePosition)
 if (edgePosition.isNearLeftEdge) {
 
    startEdgeInterval('left');
  } else if (edgePosition.isNearRightEdge) {
    startEdgeInterval('right');
  } else {
    // в любом др случае нам этот таймер не нужен при данном событии
    //  те пока указатель не в краевое зоне ленту крутить не надо
    stopEdgeInterval();
    //  работает обычный свайп
    handleTouchSwipe(e);
  }

   
  } 

  //  отдельно handlerPointerCancel!!!
  const handlePointerCancel = (e:React.PointerEvent<HTMLDivElement>) => {
    //  в любом случае возобновляем автоплей как дефолтное состояние 
    if(ALL_POINTER_TYPES.includes(e.pointerType)){
      resumeAutoPlay();
    }
    
    //  сбрасиываем первую координату свайпа
    startXRef.current = null;

      //  в любом непредвиденном случае остановить интервал
    // stopEdgeInterval();
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
