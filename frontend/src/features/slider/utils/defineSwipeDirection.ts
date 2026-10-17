export const defineSwipeDirection = ({currentCoordinateX, lastCoordinateX}:{currentCoordinateX:number,  lastCoordinateX:number})=>{
    if(lastCoordinateX === null) return;
    
    if(currentCoordinateX > lastCoordinateX) {
      return 'right'
    }
    if(currentCoordinateX < lastCoordinateX) {
      return 'left'
    }
}