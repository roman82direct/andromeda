import type { TDescriptWithImageLink } from "@/shared/types/types";
import { AppImage } from "@/shared/ui/app-image/app-image";
import { Link } from "react-router-dom";
import styles from "./overview-product-tab-content.module.css";

export type OverviewProductContentProps = TDescriptWithImageLink & {
  isAnimation?: boolean;
};
// сделать анимацию появления и
// исчезновения контента возможно абстрактно через tabs
//  + доделать стили для этого компонента
export const OverviewProductContentItem = ({
  link,
  srcImage,
  descpImage,
}: OverviewProductContentProps) => {
  return (
    <Link className={styles["catalog-tab-content-item"]} to={link}>
      <figure>
        <div className={styles["wrapper-image"]}>
          <AppImage
            srcImage={srcImage}
            descrImage={`изображение таба ${descpImage}`}
          />
        </div>
        {descpImage && (
          <figcaption className={"figcaption-catalog-image"}>
            {descpImage}
          </figcaption>
        )}
      </figure>
    </Link>
  );
};
