import { Slider, type SliderCommonSettings } from "@/features/slider";
import {productsCardData} from './model/productsStore';

const DEFAULT_PRODUCTS_SLIDER_SETTINGS: SliderCommonSettings ={
  infiniteLoop: true,
  quantityShowSlides: 1,
  isPagination: true,
  autoPlay: false,
  autoPlayTime: 3000,
  pagePaginationSize: 3,
}






const renderProductsSliderUI =()=>{

}

export const ProductsSlider = ()=>{
  
  




  return <Slider {...DEFAULT_PRODUCTS_SLIDER_SETTINGS} slides={productsCardData}>

  </Slider>
}