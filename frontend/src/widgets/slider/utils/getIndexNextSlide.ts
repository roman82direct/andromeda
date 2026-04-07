import type { TActionSlide} from "../types";



type TSwitchIndexParams = {
  action: TActionSlide;
  prevIndex:number,
  ArrSizeSlides:number
}



  export const getNextIndexSlide = ({
    action,
    prevIndex,
    ArrSizeSlides,
  }:TSwitchIndexParams):number =>{

    const nextIndex = action === 'increment' ? (
        prevIndex === ArrSizeSlides - 1 ?  
            0 : prevIndex + 1
    ) : (prevIndex === 0 ?  
            ArrSizeSlides - 1 : 
            prevIndex - 1
          )

    return nextIndex

  }


//  на заметку  интересный способ
  // const changeSlide = (direction = 1) => {
  //   let slideNumber = 0;

  //   if (slide + direction < 0) {
  //     slideNumber = items.length - 1;
  //   } else {
  //     slideNumber = (slide + direction) % items.length;
  //   }