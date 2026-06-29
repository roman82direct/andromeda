import type { TImage } from "@/shared/types/types";
import { AppImage } from "@/shared/ui/app-image/app-image";
import { Link } from "react-router-dom";
import styles from './catalog-tab-content.module.css';


export type CatalogContentProps = {
  index: number | string;
  link: string;
  srcImage: TImage;
  descpImage: string;
  isAnimation?: boolean;
};
// сделать анимацию появления и
// исчезновения контента возможно абстрактно через tabs
//  + доделать стили для этого компонента
export const CatalogTabContentItem = ({
  index,
  link,
  srcImage,
  descpImage,
 
}: CatalogContentProps) => {


  return (
    <Link className={styles['catalog-tab-content-item']} key={index} to={link}>
      <figure>
        <picture className={styles['wrapper-image']}>
          <AppImage
            srcImage={srcImage}
            descrImage={`изображение ${descpImage}`}
            className={""}
          />
        </picture>
        {descpImage && <figcaption className={"figcaption-catalog-image"}>{descpImage}</figcaption>}
      </figure>
    </Link>
  );
};
