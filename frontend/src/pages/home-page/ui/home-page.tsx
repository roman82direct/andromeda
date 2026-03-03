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
  //  зададим изнач значение пагинации
   const initialIndexes = [0,1,2]
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState(0);
  //  работа с пагинацией слайдов
  const [indexesPag,setIndexesPag] = useState(initialIndexes);
 const  currentSlide = sliders[indCurrSlide];
  
  const handleChangeSlide = (value:'increment' | 'decrement') => {
      if(value === 'increment') {
        //  перемещаем слайды впереде
        setIndexSlide((prev)=>prev>=sliders.length-1 ? 0 : prev + 1)
        // работаем с  с синхронномтью пагинации
        if(indCurrSlide === indexesPag[indexesPag.length-1]) {
          //  если номер текущего слайда последний в тройке 
          //  то создаим след тройку кнопопк пагинации
          // возьмем след элемент за текущим
          const nextIndexSlide = indCurrSlide+1;
          // определим след тройку  те возьмем след три элемента массива индексов
          //  вместо тройки д б нечто динамическое?
          const cutterSizeLimit = nextIndexSlide + 3
          // обращаемся ко всем индексам чтобы получить кокретный набор
          const nextPaginIndexes = allIndexex.slice(nextIndexSlide,cutterSizeLimit)
          //  обновим индексы пагинации
          setIndexesPag(nextPaginIndexes)
        }
        if(indCurrSlide === allIndexex[allIndexex.length-1]){
          //  если мы достигли последнего слайдка вообще т е это последний номер(индекс) в массива номеров слайдов
          //  просто обнулим его и вернемся к изначальной нумерации в пагинации
          setIndexesPag(initialIndexes)
        }

      }else {
        //  перемещение влево value === 'decrement'
        setIndexSlide((prev)=>prev<=0 ? sliders.length-1 : prev -1)
        //  надо сделать тройку пагинации в обратную сторону
        // если тек индекс слайда равен первому элементу пагинации с инд 0
        if(indCurrSlide === indexesPag[0] && indCurrSlide!==0){
          //  определим лимит до какого элемента пагиации копируем тройку
          const cutterSizeLimit = indCurrSlide;
          // определим с какого элемента пагинации начнем копирование
          const nextIndexSlide = indCurrSlide  - 3;
          // определим след тройку
          // console.log(nextIndexSlide, cutterSizeLimit)
          const nextPaginIndexes = allIndexex.slice(nextIndexSlide,cutterSizeLimit);
          // обновим пагинацию назад
          // console.log(nextPaginIndexes)
          setIndexesPag(nextPaginIndexes)
        }
         else if(indCurrSlide === indexesPag[0] && indCurrSlide===0){
            // если мы в начале 
             //  определим лимит до какого элемента пагиации копируем тройку
          const nextIndexSlide = allIndexex.length - 3;
          // определим с какого элемента пагинации начнем копирование
          const cutterSizeLimit =allIndexex.length;
          // определим след тройку
          console.log(nextIndexSlide, cutterSizeLimit)
          const nextPaginIndexes = allIndexex.slice(nextIndexSlide,cutterSizeLimit);
          // обновим пагинацию назад
          console.log(nextPaginIndexes)
          setIndexesPag(nextPaginIndexes)
         }

      }
  }

  useEffect(()=>{
    const timer = setInterval(()=>{
    
      // handleChangeSlide('increment')
       
     },4000)
    return (()=>{
      clearInterval(timer)
    })
  },[sliders.length])



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
