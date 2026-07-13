import type { TypeOperationFlip } from "../types";

type TSwitchIndexParams = {
  typeOperation: TypeOperationFlip;
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
