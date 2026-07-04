import type { TDescriptWithImageLink } from "@/shared/types/types"
import { CatalogCardUI } from "./catalog-card/catalog-card"

type CatalogCardsUIProps = {
  cards:TDescriptWithImageLink[]
}


export const CatalogCardsUI = ({cards}:CatalogCardsUIProps )=>{
  return <ul>
      {
        cards.map((card,index)=>(
          <li key={index}>
            <CatalogCardUI
              link={card.link}
              srcImage={card.srcImage}
              descpImage={card.descpImage}
            />
          </li>
          
        ))
      }
  </ul>
}