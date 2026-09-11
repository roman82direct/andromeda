import { SliderTrack } from "@/features/slider"
import styles from './products-slider.module.css';
import { renderProductSlides } from "./components/render-products-slides";

export const ProductsSliderUI = ()=>{
  // название
  // пагинация
  // ссылка на все товары
  const gap = 10;
  const stylesCardsTrack = {
      display: 'flex',
      '--gap': `${gap}px`,
    } as React.CSSProperties
  return <div className={styles['product-slider']}>
    
      <SliderTrack 
        layOutTrackStyles={stylesCardsTrack}
        customStyles={
          {gap}
        }
        >
          {renderProductSlides}
      </SliderTrack>
  </div>
}
