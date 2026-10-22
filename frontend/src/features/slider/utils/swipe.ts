import type { TSwipeCoordinates } from "../types";




export const defineSwipeDirection = ({currentCoordinate, lastCoordinate}:TSwipeCoordinates)=>{
    if(lastCoordinate === null) return;
    
    if(currentCoordinate > lastCoordinate) {
      return 'right'
    }
    if(currentCoordinate < lastCoordinate) {
      return 'left'
    }
}

export const doSwipe = (
    {currentCoordinate, lastCoordinate}:TSwipeCoordinates, 
    forwardCallback: ()=> void,
    backCallback: ()=> void,
    threshold: number = 30,
  ):boolean=>{
    //  после запомининия координаты в вычисляем разницу координат начальной точки  и текущей 
    // чтобы понять надо ли делать свайп
    const differencePositions = lastCoordinate - currentCoordinate;
    let isUpdatelastCoordinate: boolean = false;

    if (differencePositions > threshold) {
        // листаем вправо
        forwardCallback();
        isUpdatelastCoordinate = true;
      
        // console.log('to left')
    } else if (differencePositions < - threshold) {
       
        backCallback();
       isUpdatelastCoordinate = true;
    }

   
    return  isUpdatelastCoordinate
  }

//  запись координаты при событии down

   export const recordCoordinateFirstTouch = (e: React.PointerEvent<HTMLElement>,touchPointerTypes:string[]) => {
    //  для события down 
    //   здесь запомним координату перввого касания
      if (
      e.isPrimary &&
        touchPointerTypes.includes(e.pointerType)
      // (e.pointerType === "touch" || e.pointerType === "pen")
      ) {
          //  если это "первый" палец
          // запоминаем первую координату
          const pointerDown = e.clientX;
          // возвращаем ее 
          return pointerDown
          // isSwipingRef.current = false;
        }
        return null

  };