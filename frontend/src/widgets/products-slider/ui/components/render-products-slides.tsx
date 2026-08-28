import { CardProduct, type TCardProduct } from "@/entities/product"
import styles from '../products-slider.module.css';
import { v4 as uuidv4 } from 'uuid';

export const renderProductSlides = (slidesProducts: TCardProduct[] )=>{
  
  return slidesProducts.map((slideProduct)=>{
    const idCard = uuidv4();
    return <div key={idCard} className={styles['card-slide-wrapper']}>
              <CardProduct  {...slideProduct}/>
          </div>
   
  })
}