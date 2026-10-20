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
    //  вычисляем разницу координат начальной точки  и текущей 
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