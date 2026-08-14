import { SliderTrack } from "@/features/slider"
import styles from './products-slider.module.css';
import { renderProductSlides } from "./components/render-products-slides";

export const ProductsSliderUI = ()=>{
  // название
  // пагинация
  // ссылка на все товары
  return <div className={styles['product-slider']}>
      <SliderTrack>
          {renderProductSlides}
      </SliderTrack>
  </div>
}
