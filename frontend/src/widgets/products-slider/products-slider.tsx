import { Slider, type SliderCommonSettings } from "@/features/slider";
import { productsCardData } from "./model/productsStore";
import { renderProductsSliderUI } from "./ui/render-products-slider";
// import styles from './ui/products-slider.module.css';

const DEFAULT_PRODUCTS_SLIDER_SETTINGS: SliderCommonSettings = {
  infiniteLoop: true,
  quantityShowSlides: 5,
  isPagination: true,
  autoPlay: true,
  autoPlayTime: 3000,
  pagePaginationSize: 3,
};

export const ProductsSlider = () => {
  return (
    <Slider {...DEFAULT_PRODUCTS_SLIDER_SETTINGS} slides={productsCardData}>
      {renderProductsSliderUI}
    </Slider>
  );
};
