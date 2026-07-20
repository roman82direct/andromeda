import styles from "./main-promo-slider.module.css";
import { memo } from "react";
import { SlidesList } from "@/features/slider/";
import { Dots } from "../components/dots/dots";
import { Arrows } from "../components/arrows/arrows";
import {renderedSlides} from '../utils/renderSlides';

export type MainPromoSliderUIProps = {
  isPagination?: boolean;
  onSubjectEnterHandler?: ()=>void;
  onSubjectLeaveHandler?: ()=>void;
};

//  надо посмотреть как можно оптимизировать ?
export const MainPromoSliderComponentUI = ({
  onSubjectEnterHandler,
  onSubjectLeaveHandler,
  isPagination,
}: MainPromoSliderUIProps) => {
  // передать сюдя функции веместо объекта чтобы избежать лишней мемоизации
  // const onMouseEnterHandler = useCallback(()=>{
  //   settingAutoPlay?.runAutoPlay()
   
  // },[settingAutoPlay])

  //  const onMouseLeaveHandler =  useCallback(()=>{
  //   settingAutoPlay?.stopAutoPlay()
  // },[settingAutoPlay])
  //  есть смысл это тоже выделить в отдельную фичу
  //  как навешиветель обработчиков в тч для touhc скринов!!
  // сделать поинтеры вместо onTouch ????

  const eventHandler = (e:React.TouchEvent)=>{
    onSubjectEnterHandler?.()
    console.log(e.type)
  }
  return (
    <div
      className={styles.slider}
      // нужно сделать аналог на тач скринах+ перелистиывание слайдов рукой
      onMouseEnter={onSubjectEnterHandler}
      onMouseLeave={onSubjectLeaveHandler}
      onTouchStart={eventHandler }
      onTouchEnd={onSubjectLeaveHandler}
      onTouchCancel={onSubjectLeaveHandler}
    >
      <SlidesList>{renderedSlides}</SlidesList>
      <div className={styles["slider-nav"]}>
        <Arrows />
        {isPagination && <Dots />}
      </div>
    </div>
  );
};

export const MainPromoSliderUI = memo(MainPromoSliderComponentUI);
MainPromoSliderUI.displayName = "MainPromoSliderUI";
