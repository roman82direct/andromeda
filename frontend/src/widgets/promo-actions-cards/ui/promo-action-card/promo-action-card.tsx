import type { TDescriptWithImageLink} from "@/shared/types/types"
import { AppImage } from "@/shared/ui/app-image/app-image"
import { Link } from "react-router-dom"


// type CatalogCardsProps = {
//   link:string;
//   description: str
// }

  export const PromoActionCardUI = ({
    link,
    srcImage,
    descpImage
  }:TDescriptWithImageLink)=>{
    return <article>

        <Link className="" to={link}>
        
            <AppImage
              srcImage={srcImage}
              descrImage={`изображение промо акции  ${descpImage}`}
            />
          
          <h3 >{descpImage}</h3>
        
        </Link>
      </article>
    
    
  }