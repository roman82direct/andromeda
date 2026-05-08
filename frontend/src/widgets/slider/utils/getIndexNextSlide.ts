import type { TActionSlide } from "../types";

type TSwitchIndexParams = {
  typeOperation: TActionSlide;
  prevIndex: number;
  ArrSizeSlides: number;
};

export const getNextIndexSlide = ({
  typeOperation,
  prevIndex,
  ArrSizeSlides,
}: TSwitchIndexParams): number => {
  const nextIndex =
    typeOperation === "increment"
      ? prevIndex === ArrSizeSlides - 1
        ? 0
        : prevIndex + 1
      : prevIndex === 0
        ? ArrSizeSlides - 1
        : prevIndex - 1;

  return nextIndex;
};

//  на заметку  интересный способ
// const changeSlide = (direction = 1) => {
//   let slideNumber = 0;

//   if (slide + direction < 0) {
//     slideNumber = items.length - 1;
//   } else {
//     slideNumber = (slide + direction) % items.length;
//   }
