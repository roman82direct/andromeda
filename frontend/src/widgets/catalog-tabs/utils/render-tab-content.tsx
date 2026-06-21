import { Link } from "react-router-dom"
import type { TCatalogContent } from "../types"
import { AppImage } from "@/shared/ui/app-image/app-image";

export const renderTabContent = (tabContent:  TCatalogContent[]) => {
  return <>
    {
      //  функцию можно  масштабировать под разный контент
      tabContent.map((contentItem, index)=> {
        const key = contentItem.link || index;
        //  создать для ссылки переход
       return ( 
        // сделать navlink вместо link для активной ссылки
        <Link key={key} to={contentItem.link}>
          {/* подумать насчет подпписи */}
          {/* здесь нужно масштабировать контент */}
          <figure>
            <picture>
              <AppImage srcImage={contentItem.image} descrImage={`изображение ${contentItem.descpImage}`} />
            </picture>
            {contentItem.descpImage && (<figcaption>{contentItem.descpImage}</figcaption>)}
          </figure>
         
          </Link> 
        )
      })
    }
  </>
}