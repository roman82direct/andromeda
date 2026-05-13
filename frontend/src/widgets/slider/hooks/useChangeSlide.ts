import type { TConfigChangeSlide, TSlideItem} from "../types";
import { useCallback,   useMemo, useReducer, useEffect} from "react";
import type { TActionSlide } from "../types";
// import { getNextIndexSlide } from "../utils/getIndexNextSlide";
import { getPagIndexes } from "../utils/getPagIndexes";
import { initialStateSlider, sliderReducer } from "../model/sliderReducer";




export const useChangeSlide = (
  slides: TSlideItem[], 
  {
    autoPlay, 
    autoPlayTime = 3000,
    pagePaginationSize
  }:TConfigChangeSlide 
) => {

  // 1. Подготавливаем слайды с клонами 
  // (абстрагировать логику клонирования - допустим если нам это не надо)
  const slidesWithClones = useMemo(() => {
  if (slides.length === 0) return [];
  return [slides[slides.length-1], ...slides, slides[0]];
}, [slides]);



  const [stateSlader, dispatch] = useReducer(
    sliderReducer, 
    // на основе 2 обхектаинициализируем состояние 
    slidesWithClones,
    // ленивая загрузка - функция вызывается один раз при монтир компоненте(передатьданные кот зависят от пропсов)
    (slides)=>{
      return {
        ...initialStateSlider,
        preparedSlides:slides
      }
    }
  )


  //  обновление слайдов(напр если они пришли с сервера снова)
  useEffect(()=>{
      dispatch({
        type:'SET_PREPARED_SLIDES',
        payload: slidesWithClones
      })
  },[slidesWithClones])


 // определим пагинацию 
  const preparedIndexesForPag = useMemo(()=>{
    const currentIndexesPag = getPagIndexes(
      stateSlader.indexSlide-1, 
      pagePaginationSize || 3, 
      slides.length
    );
    return currentIndexesPag.map((dotIndex)=>(
      dotIndex+1
  ))},[stateSlader.indexSlide, slides.length, pagePaginationSize])

 //  отключить/включить автоматическое изменение картинок слайдера
  // const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);
//  подготовка слайдов ксозданию 'бесконечной прокрутки'
 const handleChangeSlide = useCallback(
    (typeOperation: TActionSlide) => {
      
      dispatch({type:'CHANGE_SLIDE',payload:typeOperation})
     
    },
    [],
  );

  const handleTransitionEnd = useCallback( ()=>{
    // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
    dispatch({type:'TRANSITION_END'})
},[])

//  можем сменить слайд на тот который нам нужно
  const setIndexSlide = useCallback((indexSlide:number)=>{
    dispatch({type:'SET_INDEX', payload:indexSlide})
  }, [])
  
  // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
  //  обработчик для onMouseOn onMouseEnter 
  const handleToggleRunAutoPlayShowSlides = ()=>{
    dispatch({type:'TOGGLE_AUTOPLAY', payload: !stateSlader.isAutoPlay})
  }
  
  //  автоматич показ слайдов
  useEffect(() => {
    // autoPlay  переменная должна задаваться обработчиком и если это нужно нам
    // если прогрмно автоматич смена слайдов отключена  или мышка на слайде
    if (!autoPlay || !stateSlader.isAutoPlay) return;
    const intervalIdSliders = setInterval(() => {
      dispatch({type:'CHANGE_SLIDE', payload:'increment'})
    }, autoPlayTime);

    return () => {
      clearInterval(intervalIdSliders);
    };
  }, [
      autoPlayTime, 
      autoPlay, 
      stateSlader.isAutoPlay
    ]);

  return {
    indexSlide: stateSlader.indexSlide, // индексы:слайд текущий
    setIndexSlide, // lдля прыжка на люб слайд (пагинация)
    handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
    preparedSlides: stateSlader.preparedSlides,
    isAnimating: stateSlader.isAnimating,
    transitionEnabled: stateSlader.transitionEnabled,  
    handleTransitionEnd,
    preparedIndexesForPag,
    // для автом смены слайда
    toggleAutoPlayChangeSlide:handleToggleRunAutoPlayShowSlides,
  };
};


// Старый хук без редюсера
// export const useChangeSlideFirstVersion = (slides: TSlideItem[], delay: number = 3000) => {
// //  текущий слайд который будем показывать
//   const firstRealIndexSlide = 1;
//   const [indexSlide, setIndexSlide] = useState<number>(firstRealIndexSlide);
//   // пагинация
//   const preparedIndexesForPag = useMemo(()=>{
//     const pagePagSize = 3;
//     const currentIndexesPag = getPagIndexes(indexSlide-1, pagePagSize, slides.length);
//     return currentIndexesPag.map((dotIndex)=>(
//   dotIndex+1
//   ))},[indexSlide, slides.length])
//   console.log(preparedIndexesForPag)
//   //  отключить/включить автоматическое изменение картинок слайдера
//   // const [interChangSlide, toggleIntervalSlide] = useState<boolean>(false);
// //  подготовка слайдов ксозданию 'бесконечной прокрутки'
// const slidesWithClones = useMemo(() => {
//   if (slides.length === 0) return [];
//   return [slides[slides.length-1], ...slides, slides[0]];
// }, [slides]);
// //  блокировка кнопок 
// const [isAnimating, setIsAnimating] = useState(false)
// //  управление переходом
// const [transitionEnabled, setTransitionEnabled] = useState(true)
// //  обработчик смены слайда
//   const handleChangeSlide = useCallback(
//     (typeOperation: TActionSlide) => {
//       //  если анимация идет - не даем выполнить обработчик
//         if(isAnimating) return;
//       // если сейчас анимации переключения слайда нет
//       setIsAnimating(true)
//       // запускаем переход сладйов в любом случае
//       setTransitionEnabled(true)
//           setIndexSlide((prevIndex) =>
//         getNextIndexSlide({
//           typeOperation,
//           prevIndex,
//           ArrSizeSlides: slidesWithClones.length,
//         }),
//       );
     
//     },
//     [slidesWithClones.length, isAnimating],
//   );
// //  исправить пагинацию!!!!
//   const handleTransitionEnd = useCallback( ()=>{
//     // сообщаем что анимация закончилась =>можно продолжить переключение слайдов
//         setIsAnimating(false);
      

//         if(indexSlide === 0){
//           //  над данном этапе отключаем анимацию перехода тк это 'клон'
//           // объединить состояния??? 
         
      
//         //  нулевой слайд - клон последнего слайда (из оригинальных)
//         //  нам нужно уйтис него
//         //  идем к последнему  и отключаем анимацию перехода
//         setTransitionEnabled(false);
//         setIndexSlide(slides.length);
       
//         }
//        if(indexSlide === slides.length+ 1){
//           //  унас последний слайд - он клон первого слайда (из оригинальных)
//           // length+ 1
//         //  над данном этапе отключаем анимацию перехода тк это 'клон' 
//         //  идем  к оригинальному первомму слайду и отключаем анимацию перехода
//           //  отправляем на первыйслайд(минуя клон(последнего слайда) с начала)
//           setTransitionEnabled(false);
//           setIndexSlide(1)
         
//         }
// },[indexSlide, slides.length])

  
//   // добавить флаг для остоновки автоматич пролистывания при наведении на слайд
//   //  автоматич показ слайдов
//   // useEffect(() => {
//   //   if (!interChangSlide) return;
//   //   const intervalIdSliders = setInterval(() => {
//   //     // handleChangeSlide("increment");
//   //   }, delay);

//   //   return () => {
//   //     clearInterval(intervalIdSliders);
//   //   };
//   // }, [handleChangeSlide, interChangSlide, delay]);

//   return {
//     indexSlide, // индексы:слайд текущий
//     setIndexSlide, // lдля прыжка на люб слайд (пагинация)
//     handleChangeSlide, // // Функция для кнопок "Вперед" и "Назад"
//     // автоматич переключение слайдов
//     // toggleIntervalSlide,
//     preparedSlides: slidesWithClones,
//     isAnimating,
//     transitionEnabled,  
//     handleTransitionEnd,
//     preparedIndexesForPag
//   };
// };

