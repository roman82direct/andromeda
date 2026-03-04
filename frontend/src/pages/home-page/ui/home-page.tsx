import { useEffect, useState, type FC } from "react";
import styles from "./home-page.module.css";
import { ButtonUI } from "@/shared/ui/button";
import { IconButtonUI } from "@/shared/ui/icon-button";
import type { TSliderStore } from "../model/sliderStore";
import { sliderStore } from "../model/sliderStore";


type THomePageProps = {
    banners?: TSliderStore[];
}

export const HomePageUI: FC<THomePageProps> = () => {
  // const sliders = sliderStore.slice(0,3);
  //  есть слайды
   const sliders = sliderStore;
  //   есть все индексыслайдов - используем их отображ для пагинации
   const allIndexex = Object.keys(sliders).map(item=>Number(item))
  //  зададим изнач значение пагинации - нам достаточно 3 элеметнов пагинации по макету
   const initialIndexes = [0,1,2]
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState(0);
  //  работа с пагинацией слайдов
  const [indexesPag,setIndexesPag] = useState(initialIndexes);
 const  currentSlide = sliders[indCurrSlide];
  const pagePagSize = 3;
//   const handleChangeSlide = (value:'increment' | 'decrement') => {
//       let newIndexCurrSlide;
//       if(value === 'increment') {
//         //  меняем слайд 'вперед'
//         newIndexCurrSlide = indCurrSlide>=sliders.length-1 ? 0 : indCurrSlide + 1;
//         // работаем с  с синхронномтью пагинации
//         if(indCurrSlide === indexesPag[indexesPag.length-1]) {
//           //  если номер текущего слайда последний в тройке 
//           //  то создаим след тройку кнопопк пагинации
//           // возьмем след элемент за текущим
//           const nextIndexSlide = indCurrSlide+1;
//           // определим след тройку  те возьмем след три элемента массива индексов
//           //  вместо тройки д б нечто динамическое?
//           const cutterSizeLimit = nextIndexSlide + initialIndexes.length;
//           // обращаемся ко всем индексам чтобы получить кокретный набор
//           const nextPaginIndexes = allIndexex.slice(nextIndexSlide,cutterSizeLimit)
//           //  обновим индексы пагинации
//           setIndexesPag(nextPaginIndexes)
//         }
//         if(indCurrSlide === allIndexex[allIndexex.length-1]){
//           //  если мы достигли последнего слайдка вообще т е это последний номер(индекс) в массива номеров слайдов
//           //  просто обнулим его и вернемся к изначальной нумерации в пагинации
//           setIndexesPag(initialIndexes)
//         }

//       }else {
//         //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
//         newIndexCurrSlide = indCurrSlide<=0 ? sliders.length-1 : indCurrSlide -1;
//         //  надо сделать тройку пагинации в обратную сторону
//         // если тек индекс слайда равен первому элементу пагинации с инд 0
//         if(indCurrSlide === indexesPag[0]){
//           //  определим откуда будем резать те копировать индексы пагинации
//           const prevIndexSlide = indCurrSlide-1;
//           // определим с какого элемента пагинации начнем копирование
//            const firstIndexSlide = prevIndexSlide -  initialIndexes.length+1;
//           // console.log(prevIndexSlide)
//           //  console.log(firstIndexSlide)
//           // console.log(allIndexex)
//           // определим след тройку
//           // console.log(nextIndexSlide, cutterSizeLimit)
//           const prevPaginIndexes = allIndexex.slice(firstIndexSlide,prevIndexSlide+1);
//           // обновим пагинацию назад
//           // console.log(nextPaginIndexes)
//           // проверка на один или два
//           // console.log(nextPaginIndexes)
//           setIndexesPag(prevPaginIndexes)
//           // если это нулевой элемент и остаток от деления не ноль
//               if( indCurrSlide<=0){ 
//                 if(allIndexex.length%initialIndexes.length!==0 ){
//                   // определим сколько у нас элементов в остатке от деления !!! подумать над названием переменной
//                     const numbersSliders = allIndexex.length%initialIndexes.length;
//                   // определить предыдущий элемент перед нулевым 
//                   const prevIndexSlide =  allIndexex.length;
//                   // определим начальный элемент для копирования части индексов
//                   const firstPrevIndexSlide = prevIndexSlide -numbersSliders
//                   // определим с какого начнем копировать индексы для паг
//                   const prevPaginIndexes =  allIndexex.slice(firstPrevIndexSlide,prevIndexSlide+1)
//                   // что здесь копируется ?????
//                   console.log(prevPaginIndexes);
//                   setIndexesPag(prevPaginIndexes)

//                 }
//                 // если это нулевой элемент и остаток от деления  ноль
//                 if(allIndexex.length%initialIndexes.length===0){
//                     const prevIndexSlide =  allIndexex.length-1;
//                     const firstIndexSlide = prevIndexSlide -  initialIndexes.length+1;
//                     const prevPaginIndexes = allIndexex.slice(firstIndexSlide,prevIndexSlide+1);
//                     setIndexesPag(prevPaginIndexes)

//                 }
//               }
//         }
      

//       }
// //  изменяем состояние показа слайда - т е меняем индекс слайда который будет отобр
//       setIndexSlide(newIndexCurrSlide ?? 0);
//   }

  // useEffect(()=>{
  //   const timer = setInterval(()=>{
    
  //     handleChangeSlide('increment')
       
  //    },2000)
  //   return (()=>{
  //     clearInterval(timer)
  //   })
  // },[sliders.length, handleChangeSlide])


   const handleChangeSlide = (value:'increment' | 'decrement') => {
      let newIndexCurrSlide;
      // определяем начало тройки где находится тек индекс
      //  перенести функцию ниже в utils
      // В каком блоке по N элементов находится число?
      // "находим число где оно в списке из n элементов в подсписке из m"
      // разбиение на блоки фиксированного размера Math.floor(i / m) * m
      // В каком блоке по m элементов находится элемент i
      // и где начинается этот блок?
      const getPagIndexes = (currentIndexSlide:number,showPagSize:number):number[]=>{
        // находим блок в котором находится индекс пагинации тек слайда (округляя вниз до ближ целого)
         const findBlock = Math.floor(currentIndexSlide/showPagSize);
        //  "выделяем" этот блок
        //   1.находим начало этого блока
         const startIndex =  findBlock *showPagSize
      
          // 2. определили конечный элемент тройки
      const endIndex =  startIndex + pagePagSize-1;
      //  3. определим тройку
        const forIndexesPag = allIndexex.slice( startIndex,endIndex+1);
        return forIndexesPag
      }
     
      // console.log(startIndex)
      // console.log(endIndex)
      // console.log(forIndexesPag )

      if(value === 'increment') {
        //  меняем слайд 'вперед'
        newIndexCurrSlide = indCurrSlide>=sliders.length-1 ? 0 : indCurrSlide + 1;
    

      }else {
        //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
        newIndexCurrSlide = indCurrSlide<=0 ? sliders.length-1 : indCurrSlide -1;
        
      

      }
//  изменяем состояние показа слайда - т е меняем индекс слайда который будет отобр
      setIndexSlide(newIndexCurrSlide ?? 0);
      setIndexesPag(getPagIndexes(newIndexCurrSlide,pagePagSize))
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
                { indexesPag.map((index)=>(
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
