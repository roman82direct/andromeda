import type { TDescriptWithImageLink } from "@/shared/types/types"
import { PromoActionCardUI } from "./promo-action-card/promo-action-card"
import styles from '../ui/promo-actions-cards.module.css';

type CatalogCardsUIProps = {
  cards:TDescriptWithImageLink[]
}


export const PromoActionsCardsUI = ({cards}:CatalogCardsUIProps )=>{
  return <ul className={styles['promo-actions-list']}>
      {
        cards.map((card,index)=>(
          <li className={styles['promo-action-item']} key={index}>
            <PromoActionCardUI
              link={card.link}
              srcImage={card.srcImage}
              descpImage={card.descpImage}
            />
          </li>
          
        ))
      }
  </ul>
}