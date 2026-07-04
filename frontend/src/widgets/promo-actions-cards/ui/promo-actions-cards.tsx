import type { TDescriptWithImageLink } from "@/shared/types/types"
import { PromoActionCardUI } from "./promo-action-card/promo-action-card"

type CatalogCardsUIProps = {
  cards:TDescriptWithImageLink[]
}


export const PromoActionsCardsUI = ({cards}:CatalogCardsUIProps )=>{
  return <ul>
      {
        cards.map((card,index)=>(
          <li key={index}>
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