import { SliderActionTypes, type ChangeSlideSettings } from "../types";
import { useCallback, useMemo, useReducer, useEffect } from "react";
// import type { TypeOperationFlip } from "../types";
import { getPagIndexes } from "../utils/getPagIndexes";
import {
  createInitialStateSlider,
  sliderReducer,
} from "../model/sliderReducer";

export const useChangeSlide = <T>(
  slides: T[],
  {
    autoPlay,
    pagePaginationSize,
    infiniteLoop,
    quantityShowSlides = 1,
  }: ChangeSlideSettings,
) => {
  // 1. Подготавливаем слайды с клонами
  // (абстрагировать логику клонирования - допустим если нам это не надо)
  const preparedSlides = useMemo(() => {
    if (slides.length === 0) return slides;
    if (infiniteLoop && slides.length > quantityShowSlides) {
      const clonesFirstSlides = [];
      const clonesLastSlides = [];
      for (let i = 0; i < quantityShowSlides; i++) {
        clonesFirstSlides.push(slides[i]);
        clonesLastSlides.push(slides[slides.length - 1 - i]);
      }
      clonesLastSlides.reverse();
      // return [slides[slides.length - 1], ...slides, slides[0]];
      const slidesWithClones = [
        ...clonesLastSlides,
        ...slides,
        ...clonesFirstSlides,
      ];
      return slidesWithClones;
    } else {
      return slides;
    }
  }, [infiniteLoop, slides, quantityShowSlides]);
  // редюсер состояния:
  const [stateSlider, dispatch] = useReducer(
    sliderReducer,
    // на основе 2 обхектаинициализируем состояние
    preparedSlides,
    // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
    (slidesPR: T[]) => {
      //  создадим изначальное состояние слайдера
      const initialStateSlider = createInitialStateSlider<T>();
      //  определим индекс  текущ показываемого слайда
      //  если цикл бесконечный то покказываем index + кол-во показ слайдов
      const currentIndexSlide = infiniteLoop ? quantityShowSlides : 0;
      //  чтобы не вернуло infiniteLoop undefined приведем к булеву знанечению
      const currentIsRepeating = Boolean(
        infiniteLoop && slides.length > quantityShowSlides,
      );
      //  выставляем параметры слайдера в зависимости от пропсов
      return {
        ...initialStateSlider,
        indexSlide: currentIndexSlide,
        lengthTrueSlides: slides.length,
        isRepeating: currentIsRepeating,
        transitionEnabled: true,
        preparedSlides: slidesPR,
      };
    },
  );
  //  следим за пропсами:
  //  сколько наст слайдов
  //  необходима ли бесконеч карусель ?
  useEffect(() => {
    // установим кол-во наст слайдов
    dispatch({
      type: SliderActionTypes.setTrueLengthSlides,
      payload: slides.length,
    });
    //  чтобы не вернуло infiniteLoop undefined приведем к булеву знанечению
    const currentIsRepeating = Boolean(
      infiniteLoop && slides.length > quantityShowSlides,
    );
    //  установим нужна ли бесконеч лента
    dispatch({
      type: SliderActionTypes.setIsRepeating,
      payload: currentIsRepeating,
    });
  }, [slides, infiniteLoop, quantityShowSlides]);

  //  включаем анимацию по достиж опред условия:
  // рефактор перенести этот  useEffect в handleTransitionEnd
  useEffect(() => {
    // useEffect срабатывает после того, как DOM обновился,
    // и через requestAnimationFrame говорит браузеру:
    // «Мгновенный прыжок отрисован.
    // Теперь на следующем кадре включи CSS-плавность
    // обратно и только потом разблокируй клики».
    //  при переходе с клонана настоящий слайод мыо отключили transitionEnabled
    // теперь проверем это  и обратно включаем
    if (stateSlider.isRepeating && !stateSlider.transitionEnabled) {
      // запрашиваем у браузера принудительно кадр на отрисовку
      const rafId = requestAnimationFrame(() => {
        // 1. Включаем обратно transition
        dispatch({
          type: SliderActionTypes.setTransitionEnabled,
          payload: true,
        });
        // 2. Разблокируем клики ТОЛЬКО ПОСЛЕ того как transition включился!!!!!
        dispatch({ type: SliderActionTypes.setIsAnimating, payload: false });
      });
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [stateSlider.transitionEnabled, stateSlider.isRepeating]);

  //  доработать!!!!!!!
  // если слайдер не бесконечный скрывам стрелку  если слайд первый или последний
  const isRightArrow =
    !(infiniteLoop && slides.length > quantityShowSlides) &&
    stateSlider.indexSlide === 0;
  const isLeftArrow =
    !(infiniteLoop && slides.length > quantityShowSlides) &&
    stateSlider.indexSlide === stateSlider.preparedSlides.length - 1;
  const isBlockArrow = {
    isLeftArrow,
    isRightArrow,
  };
  // определим пагинацию

  //  доработать!!!!!!!
  const preparedIndexesForPag = useMemo(() => {
    const currentIndexesPag = getPagIndexes(
      // бесконеч цикл это лишний первый или последний слайд
      // поэтому подстраиваем совпадение пагинации
      // quantityShowSlides переделать ????
      // infiniteLoop && (slides.length > quantityShowSlides) сделать одно выражение ??
      infiniteLoop && slides.length > quantityShowSlides
        ? stateSlider.indexSlide - 1
        : stateSlider.indexSlide,
      pagePaginationSize || 3,
      slides.length,
    );
    return currentIndexesPag.map((dotIndex) =>
      infiniteLoop ? dotIndex + 1 : dotIndex,
    );
  }, [
    stateSlider.indexSlide,
    slides.length,
    pagePaginationSize,
    infiniteLoop,
    quantityShowSlides,
  ]);

  //  инкапсулируем логику переключения слайдов
  const changeIndexSlide = useCallback(
    (index: number) => {
      //  если анимация перехода слайда идет, ничего не делаем
      if (stateSlider.isAnimating) return;
      //  начинаем менять слайд
      dispatch({ type: SliderActionTypes.changeSlideStart, payload: index });
      // нужно поставить isAnimating в позицию true чтобы предотвратить быстрое ошибочное нажатие
      // dispatch({type: SliderActionTypes.setIsAnimating, payload: true})
    },
    [stateSlider.isAnimating, dispatch],
  );

  const handleGoNextSlide = useCallback(() => {
    //  рассчитаем макс индекс
    const maxIndex = stateSlider.isRepeating
      ? stateSlider.lengthTrueSlides + quantityShowSlides
      : stateSlider.lengthTrueSlides - quantityShowSlides;
    if (stateSlider.indexSlide < maxIndex) {
      const resultIncrement = stateSlider.indexSlide + 1;
      changeIndexSlide(resultIncrement);
    }
  }, [
    stateSlider.isRepeating,
    stateSlider.indexSlide,
    stateSlider.lengthTrueSlides,
    quantityShowSlides,
    changeIndexSlide,
  ]);

  const handleGoPrevSlide = useCallback(() => {
    // handleChangeSlide('decrement');

    if (stateSlider.indexSlide > 0) {
      const resultDecrement = stateSlider.indexSlide - 1;
      changeIndexSlide(resultDecrement);
    }
  }, [stateSlider.indexSlide, changeIndexSlide]);

  const handleTransitionEnd = useCallback(() => {
    if (!stateSlider.isRepeating) {
      // нужно поставить isAnimating в позицию false чтобы разблокировать нажатие
      //  тк анимация закончилась и это не приведет к ошибке
      dispatch({ type: SliderActionTypes.setIsAnimating, payload: false });
      return;
    }
    // Мы доехали до клона. Выключим CSS-плавность и мгновенно перепрыгним на настоящий слайд»
    // ситуации с переходами с клонов на настоящие слайды
    if (stateSlider.indexSlide === 0) {
      // Телепортируемся на настоящий слайд без анимации

      dispatch({
        type: SliderActionTypes.resetToRealSlide,
        payload: stateSlider.lengthTrueSlides,
      });
    } else if (
      stateSlider.indexSlide ===
      stateSlider.lengthTrueSlides + quantityShowSlides
    ) {
      // Телепортируемся на настоящий слайд без анимации
      dispatch({
        type: SliderActionTypes.resetToRealSlide,
        payload: quantityShowSlides,
      });
    } else {
      //  если это не клоны  то все нужно разблокировать кнопки
      dispatch({ type: SliderActionTypes.setIsAnimating, payload: false });
    }
  }, [stateSlider, quantityShowSlides]);

  //  можем сменить слайд на тот который нам нужно
  const setIndexSlide = useCallback((indexSlide: number) => {
    dispatch({ type: SliderActionTypes.setIndex, payload: indexSlide });
  }, []);

  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  обработчик для onMouseOn onMouseEnter
  //  useCallback
  const handleToggleRunAutoPlayShowSlides = useCallback(
    (flagAutoPlay: boolean) => {
      // console.log(stateSlader)
      dispatch({
        type: SliderActionTypes.toggleAutoPlay,
        payload: !flagAutoPlay, // Если пауза (true), то автоплей станет false (выключен)
      });
    },
    [],
  );
  // инкапсулируем логику включения или выключения состояния автоплея из состояния
  // всего слайдера
  // включить автоплей
  const turnOnAutoPlay = useCallback(() => {
    if (!autoPlay) return;
    handleToggleRunAutoPlayShowSlides(true);
  }, [handleToggleRunAutoPlayShowSlides, autoPlay]);
  // выключить автоплей
  const turnOffAutoplay = useCallback(() => {
    if (!autoPlay) return;
    handleToggleRunAutoPlayShowSlides(false);
  }, [handleToggleRunAutoPlayShowSlides, autoPlay]);

  return {
    indexSlide: stateSlider.indexSlide, // индексы:слайд текущий
    setIndexSlide, // для прыжка на люб слайд (пагинация)
    isAutoPlay: stateSlider.isAutoPlay,
    preparedSlides: stateSlider.preparedSlides,
    isAnimating: stateSlider.isAnimating,
    transitionEnabled: stateSlider.transitionEnabled,
    handleTransitionEnd,
    preparedIndexesForPag,
    isBlockArrow,
    //  абстрагируем смену слайдов от внешнего мира
    handlersForChangeSlide: {
      handleGoNextSlide,
      handleGoPrevSlide,
    },
    // абстрагируем переключение автоплея слайдов от внешнего мира
    handlersForAutoPlay: {
      runAutoPlay: turnOnAutoPlay,
      stopAutoPlay: turnOffAutoplay,
    },
  };
};
