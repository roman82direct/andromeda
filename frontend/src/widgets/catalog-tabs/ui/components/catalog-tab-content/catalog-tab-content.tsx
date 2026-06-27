import type { TImage } from "@/shared/types/types";
import { AppImage } from "@/shared/ui/app-image/app-image";
import { Link } from "react-router-dom";

export type CatalogContentProps = {
  index: number | string;
  link: string;
  srcImage: TImage;
  descpImage: string;
};
// сделать анимацию появления и
// исчезновения контента возможно абстрактно через tabs
//  + доделать стили для этого компонента
export const CatalogTabContent = ({
  index,
  link,
  srcImage,
  descpImage,
}: CatalogContentProps) => {
  return (
    <Link key={index} to={link}>
      <figure>
        <picture>
          <AppImage
            srcImage={srcImage}
            descrImage={`изображение ${descpImage}`}
            className={"задать!!!!"}
          />
        </picture>
        {descpImage && <figcaption className={"?"}>{descpImage}</figcaption>}
      </figure>
    </Link>
  );
};
