import { useEffect, useState, type FC } from "react";
import styles from "./home-page.module.css";
import { ButtonUI } from "@/shared/ui/button";
import { IconButtonUI } from "@/shared/ui/icon-button";
import type { TSliderStore } from "../model/sliderStore";
import { sliderStore } from "../model/sliderStore";


type THomePageProps = {
    banners?: TSliderStore[];
}

//  перенести функцию ниже в sliders/utils слайдера
 const getPagIndexes = (currentIndexSlide:number,showPagSize:number, sliders:unknown[]):number[]=>{
//   находим все  индексы слайдов - используем их отображ для пагинации
  const allIndexexSlides = Object.keys(sliders).map(item=>Number(item))
         // определяем начало тройки где находится тек индекс
      
      // В каком блоке по N элементов находится число?
      // "находим число где оно в списке из n элементов в подсписке из m"
      // разбиение на блоки фиксированного размера Math.floor(i / m) * m
      // В каком блоке по m элементов находится элемент i
      // и где начинается этот блок?
        // находим блок в котором находится индекс пагинации тек слайда (округляя вниз до ближ целого)
         const findBlock = Math.floor(currentIndexSlide/showPagSize);
        //  "выделяем" этот блок
        //   1.находим начало этого блока
         const startIndex =  findBlock *showPagSize
      
          // 2. определили конечный элемент тройки
      const endIndex =  startIndex + showPagSize-1;
      //  3. определим тройку
        const forIndexesPag = allIndexexSlides.slice( startIndex,endIndex+1);
        return forIndexesPag
      }

export const HomePageUI: FC<THomePageProps> = () => {
  // const sliders = sliderStore.slice(0,3);
  //  есть слайды
   const sliders = sliderStore;
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState(0);
  // на основе текущего индекса показываем слайд из массива sliders
  const  currentSlide = sliders[indCurrSlide];
 //  работа с пагинацией слайдов
const pagePagSize = 3;
// вычисляем индексы пагинации так чтобы они совпали со номерами индексов слайдов в sliders
// чтобы можно было показать тек слайд, слайд перед ним и после него
const currentIndexesPag = getPagIndexes(indCurrSlide,pagePagSize,sliders);



//  создать хук дляслайда и выложить в папку sliders/hooks
   const handleChangeSlide = (value:'increment' | 'decrement') => {
      let newIndexCurrSlide;
     if(value === 'increment') {
        //  меняем слайд 'вперед'
        newIndexCurrSlide = indCurrSlide>=sliders.length-1 ? 0 : indCurrSlide + 1;
    }else {
        //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
      newIndexCurrSlide = indCurrSlide<=0 ? sliders.length-1 : indCurrSlide -1;
      }
//  изменяем состояние показа слайда - т е меняем индекс слайда который будет отобр
      setIndexSlide(newIndexCurrSlide ?? 0);
      // setIndexesPag(getPagIndexes(newIndexCurrSlide,pagePagSize))
      // setIndexesPag(forIndexesPag)
  }



  return (
    <div className={styles.home}>
      <section className={styles['home-banner']}>
        {/* вынести компонент слайдера отдельно в слайса дом стр и сделать map*/}
          <div className={styles.slider}>
           
            {<div className={styles['slider-item']}>
              <img className={styles['slider-image']} src={currentSlide.image} alt={`Акция:${currentSlide.title}`} />
              <div className={styles['banner-content']}>
                <h1 className={styles['banner-title']}>{currentSlide.title}</h1>
                {currentSlide.desc && <div className={styles['banner-text']}>{currentSlide.desc}</div>}
                  <div className={styles['banner-actions']}>
                  {currentSlide.pathsForActions.map((source,index)=>(
                     source.trigger === 'route' ? <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  to={source.path}>{source.title}</ButtonUI>
                     : <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  onClick={source.callback}>{source.title}</ButtonUI>
                  ))
                  }
                </div>
               </div>
            </div>}
          </div>
          <div className={styles['banner-nav']}>
              <div className={styles['banner-arrows']}>
                <IconButtonUI onClick={()=>handleChangeSlide('decrement')}iconClass={'arrow-right'} isActive={false} colorIcon={'primary'}/>
                <IconButtonUI  onClick={()=>handleChangeSlide('increment')}iconClass={'arrow-left'} isActive={false} colorIcon={'primary'}/>
              </div>
              <ul className={styles['banner-pag']}>
                {/* если нужна пагинация для всех слайдов(все страницы) */}
                {/* { sliders.map((_,index)=>(
                   <li key={index} className={styles['banner-pag-item']}>
                    <IconButtonUI onClick={()=>{setIndexSlide(index)}} iconActiveClass={'ellipse-filled'} iconClass={'ellipse-emptied'} isActive={index===indexSlide} colorIcon={'primary'}/>
                  </li>
                ))
                 
               } */}
              {/* рисуем пагинацию */}
                { currentIndexesPag.map((index)=>(
                   <li key={index} className={styles['banner-pag-item']}>
                    <IconButtonUI onClick={()=>{setIndexSlide(index)}} iconActiveClass={'ellipse-filled'} iconClass={'ellipse-emptied'} isActive={index===indCurrSlide} colorIcon={'primary'}/>
                  </li>
                ))
                }
              </ul>
            </div>

          
      </section>
      
    </div>
  );
};
