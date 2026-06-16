import { Link } from "react-router-dom"
import type { TCatalogContent } from "../types"

export const renderTabContent = (tabContent:  TCatalogContent[]) => {
  return <>
    {
      //  функцию можно  масштабировать под разный контент
      tabContent.map((contentItem)=> (
        //  создать для ссылки переход
        <Link to=''>
          {/* подумать насчет подпписи */}
          <figure>
            <img src={contentItem.image} alt={contentItem.descpImage} />
            <figcaption>{contentItem.descpImage}</figcaption>
          </figure>
         
        </Link> 
      ))
    }
  </>
}