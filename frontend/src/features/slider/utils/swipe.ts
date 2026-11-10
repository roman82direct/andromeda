import type { TSwipeCoordinates } from "../types";


// !!!! Также добавьте useEffect(() => stopEdgeInterval, []), чтобы интервал очищался при размонтировании.

export const defineSwipeDirection = ({currentCoordinate, lastCoordinate}:TSwipeCoordinates)=>{
    if(lastCoordinate === null) return;
    
    if(currentCoordinate > lastCoordinate) {
      return 'right'
    }
    if(currentCoordinate < lastCoordinate) {
      return 'left'
    }
}

export const doSwipeBetweenTwoDots = (
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

 type TEdgePosition = {
  isNearLeftEdge: boolean;
  isNearRightEdge: boolean;
};

//  определение краев свайпа
export const defineEdgePosition = (
  e: React.PointerEvent<HTMLElement>,
  sizeToEdge?: number
): TEdgePosition => {
  const rect = e.currentTarget.getBoundingClientRect();
    // если размер не задан берем 15 от ширины  ленты слайдера  но не менее 48 или не более 96
  const valueZoneEdge = sizeToEdge ?? Math.min(96, Math.max(48, rect.width * 0.15))
  //  подумать еще 
  return {
    isNearLeftEdge: e.clientX <= rect.left + valueZoneEdge,
    isNearRightEdge: e.clientX >= rect.right - valueZoneEdge,
  };
};