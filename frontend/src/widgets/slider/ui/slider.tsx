// import { ButtonUI } from "@/shared/ui/button";
// import { IconButtonUI } from "@/shared/ui/icon-button";
// import styles from './main-slider.module.css';
// import type { TActionUser } from "@/shared/types/types";


// export type TSlideItem = {
//   image: string;
//   title: string;
//   desc?: string;
//   pathsForActions: TActionUser[];
// }

// type SliderUIProps = {
//   showingSlide: TSlideItem;
//   setSlide:()=>void;
// }

// export const SliderUI = ()=>{
//   return (
//     <div className={styles.home}>
//       <section className={styles['home-banner']}>
//         {/* вынести компонент слайдера отдельно в слайса дом стр и сделать map*/}
//           <div className={styles.slider}>
           
//             {<div className={styles['slider-item']}>
//               <img className={styles['slider-image']} src={currentSlide.image} alt={`Акция:${currentSlide.title}`} />
//               <div className={styles['banner-content']}>
//                 <h1 className={styles['banner-title']}>{currentSlide.title}</h1>
//                 {currentSlide.desc && <div className={styles['banner-text']}>{currentSlide.desc}</div>}
//                   <div className={styles['banner-actions']}>
//                   {currentSlide.pathsForActions.map((source,index)=>(
//                      source.trigger === 'route' ? <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  to={source.path}>{source.title}</ButtonUI>
//                      : <ButtonUI key={index} variant={index=== 0 ? 'filled' : 'outlined'} color={index === 0 ? 'primary': 'secondary'}  onClick={source.callback}>{source.title}</ButtonUI>
//                   ))
//                   }
//                 </div>
//                </div>
//             </div>}
//           </div>
//           <div className={styles['banner-nav']}>
//               <div className={styles['banner-arrows']}>
//                 <IconButtonUI onClick={()=>handleChangeSlide('decrement')}iconClass={'arrow-right'} isActive={false} colorIcon={'primary'}/>
//                 <IconButtonUI  onClick={()=>handleChangeSlide('increment')}iconClass={'arrow-left'} isActive={false} colorIcon={'primary'}/>
//               </div>
//               <ul className={styles['banner-pag']}>
//                 {/* если нужна пагинация для всех слайдов(все страницы) */}
//                 {/* { sliders.map((_,index)=>(
//                    <li key={index} className={styles['banner-pag-item']}>
//                     <IconButtonUI onClick={()=>{setIndexSlide(index)}} iconActiveClass={'ellipse-filled'} iconClass={'ellipse-emptied'} isActive={index===indexSlide} colorIcon={'primary'}/>
//                   </li>
//                 ))
                 
//                } */}
//               {/* рисуем пагинацию */}
//                 { indexesPag.map((index)=>(
//                    <li key={index} className={styles['banner-pag-item']}>
//                     <IconButtonUI onClick={()=>{setIndexSlide(index)}} iconActiveClass={'ellipse-filled'} iconClass={'ellipse-emptied'} isActive={index===indCurrSlide} colorIcon={'primary'}/>
//                   </li>
//                 ))
//                 }
//               </ul>
//             </div>

          
//       </section>
      
//     </div>
//   );
// };
// }