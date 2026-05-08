import { useReducer, useMemo, useCallback } from "react";
import type { TActionSlide } from "../types";
import { getNextIndexSlide } from "../utils/getIndexNextSlide";
import { getPagIndexes } from "../utils/getPagIndexes";

// опишем состояние
type TSliderState = {
  indexSlide: number;
  isAnimating: boolean; // общий процесса анимации(для блокировки кнопок)
  transitionEnabled: boolean; //состояние перехода слайдов

}

// опишем действия


// напишем редюсер