import { useState } from "react";
//  подмуть над архитектурой
type ArgsForInteractions = {
  callBackStop: ()=>void;
  callBackStart: ()=>void;
  enabled: boolean;
  forwardCallback:()=>void;
  backCallback:()=>void;
}

//  настроить обработку свайпов - урбать с мышки
export const useSliderInteractions =  ({callBackStop, callBackStart, enabled, forwardCallback, backCallback}:ArgsForInteractions )=>{
    // состояние для свайпов 
   const [pointerPosition, setPointerPosition] = useState<number | null>(null);


  //  работа с мышкой границы
    const handlePointerEnter = (e:React.PointerEvent)=>{
       if(!enabled) return;
         console.log('mouseEnter')
      if(e.pointerType === 'mouse') {
      
          callBackStop();
        }
    }
    
    const handlePointerLeave = (e:React.PointerEvent)=>{
       if(!enabled) return;
      if(e.pointerType === 'mouse') {
        console.log('mouseLeave')
        callBackStart();
      }
    }



    //   тач прикосновение
    // конец прикосновения
     const handlePointerUp  = (e:React.PointerEvent)=>{
       if(!enabled) return;
      //   работа автоплея
        if(e.pointerType === 'touch' || e.pointerType === 'pen') {
          callBackStart();
        }
    }
    //  начало прикосновения
    const handlePointerDown = (e:React.PointerEvent)=>{
        
      if(e.isPrimary){
        // console.log(e)
         const pointerDown = e.clientX;
           
           setPointerPosition(pointerDown)
      }

       if(!enabled) return;
      //  подумать как не смешивать логику
        //   работа автоплея
        if(e.pointerType === 'touch' || e.pointerType === 'pen') {
          callBackStop();
        }
        // console.log(e)
        //  свайп
        //  получаем первое касание по горизонтали (свайп слайда)
        // =e.touches[0].clientX;  не надо ????
        //  если это первый палец 
      
        
         
        
       
        //  запоминаем его 
        
    }

    const handlePointerMove = (e:React.PointerEvent)=>{
      // console.log(e)
      if(pointerPosition === null) return;
        // вычеслим текущую  горизон позицию
        const currentDirection =e.clientX;
        // console.log(currentDirection)
        // получим разницу  в зависимости от не будем листать слайд в лево или право
        const differencePositions = pointerPosition - currentDirection;
        // console.log(currentDirection)
        // console.log(pointerPosition)
        // console.log(differencePositions)
        // console.log(e)
      if(differencePositions > 1){
        // листаем вправо
        forwardCallback();
      }
      if(differencePositions < -1){
        // листаем влево
        backCallback();
      }
    
        setPointerPosition(null)
    }
    
  return {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerUp: handlePointerUp,
          onPointerDown: handlePointerDown,
          onPointerCancel: callBackStart, // продумать расширить!!!!
          onPointerMove: handlePointerMove
        }
}