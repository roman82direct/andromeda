import { Slider,  type SliderCommonSettings } from "@/features/slider";
import {productsCardData} from './model/productsStore';
import { renderProductsSliderUI } from "./ui/render-products-slider";
// import styles from './ui/products-slider.module.css';

const DEFAULT_PRODUCTS_SLIDER_SETTINGS: SliderCommonSettings ={
  infiniteLoop: false,
  quantityShowSlides: 5,
  isPagination: true,
  autoPlay: false,
  autoPlayTime: 3000,
  pagePaginationSize: 3,
}

// type ProductsSlidesProps = {
//   slides: string[]
// }

// сделать возсожным передачу слайдов

// type ProductsSliderProps = {
//   nameSlider: string;
//   link: string;
// }

export const ProductsSlider = ()=>{

  return <Slider {...DEFAULT_PRODUCTS_SLIDER_SETTINGS} slides={productsCardData}>
      {renderProductsSliderUI}
  </Slider>
}