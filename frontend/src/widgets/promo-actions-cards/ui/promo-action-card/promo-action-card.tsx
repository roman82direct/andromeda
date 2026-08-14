import type { TDescriptWithImageLink } from "@/shared/types/types";
import { AppImage } from "@/shared/ui/app-image/app-image";
import { Link } from "react-router-dom";
import styles from "./promo-action-card.module.css";

// type CatalogCardsProps = {
//   link:string;
//   description: str
// }

export const PromoActionCardUI = ({
  link,
  srcImage,
  descpImage,
}: TDescriptWithImageLink) => {
  return (
    <article className={styles["promo-card"]}>
      <Link className={styles["promo-card-link"]} to={link}>
        <div className={styles["promo-info-container"]}>
          <div className={styles["promo-image-wrapper"]}>
            <AppImage
              srcImage={srcImage}
              descrImage={`изображение промо акции  ${descpImage}`}
            />
          </div>
          <h3 className={styles["promo-card-title"]}>{descpImage}</h3>
        </div>
      </Link>
    </article>
  );
};
