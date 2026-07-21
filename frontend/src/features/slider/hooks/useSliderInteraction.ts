
type ArgsForInteractions = {
  callBackStop: ()=>void;
  callBackStart: ()=>void;
}

export const useSliderInteractions =  ({callBackStop, callBackStart}:ArgsForInteractions )=>{
    //  работа с мышкой границы
    const handlePointerEnter = (e:React.PointerEvent)=>{
      if(e.pointerType === 'mouse') {
          callBackStop();
        }
    }
    
    const handlePointerLeave = (e:React.PointerEvent)=>{
      if(e.pointerType === 'mouse') {
        callBackStart();
      }
    }

    //   тач прикосновение
     const handlePointerUp  = (e:React.PointerEvent)=>{
        if(e.pointerType === 'touch' || e.pointerType === 'pen') {
          callBackStart();
        }
    }

    const handlePointerDown = (e:React.PointerEvent)=>{
        if(e.pointerType === 'touch' || e.pointerType === 'pen') {
          callBackStop();
        }
    }
    
  return {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerUp: handlePointerUp,
          onPointerDown: handlePointerDown,
          onPointerCancel: callBackStart
        }
}