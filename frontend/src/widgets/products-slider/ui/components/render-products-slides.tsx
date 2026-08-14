import { CardProduct, type TCardProduct } from "@/entities/product"
import styles from '../products-slider.module.css';

export const renderProductSlides = (slidesProducts: TCardProduct[] )=>{
  return slidesProducts.map((slideProduct)=>{
    return <div className={styles['card-slide-wrapper']}>
              <CardProduct key={slideProduct.id} {...slideProduct}/>
          </div>
   
  })
}