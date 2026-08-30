import { SliderTrack } from "@/features/slider"
import styles from './products-slider.module.css';
import { renderProductSlides } from "./components/render-products-slides";

export const ProductsSliderUI = ()=>{
  // название
  // пагинация
  // ссылка на все товары
  const stylesCardsTrack = {
      display: 'flex',
      gap: '10px'
    } as React.CSSProperties
  return <div className={styles['product-slider']}>
    
      <SliderTrack layOutTrackStyles={stylesCardsTrack}>
          {renderProductSlides}
      </SliderTrack>
  </div>
}
