import { Slider, SliderTrack, type SliderCommonSettings } from "@/features/slider";
import {productsCardData} from './model/productsStore';
import styles from './ui/products-slider.module.css';

const DEFAULT_PRODUCTS_SLIDER_SETTINGS: SliderCommonSettings ={
  infiniteLoop: true,
  quantityShowSlides: 1,
  isPagination: true,
  autoPlay: false,
  autoPlayTime: 3000,
  pagePaginationSize: 3,
}





const renderProductSlides = ()=>{
  return <>

  </>
}


const ProductSliderUI = ( )=>{
  return <div className={styles['product-slider']}>
      <SliderTrack>
          {renderProductSlides}
      </SliderTrack>
  </div>
}


const renderProductsSliderUI =()=>{
  return (
    <ProductSliderUI/>
  )
}

export const ProductsSlider = ()=>{
  
  




  return <Slider {...DEFAULT_PRODUCTS_SLIDER_SETTINGS} slides={productsCardData}>
      {renderProductsSliderUI}
  </Slider>
}