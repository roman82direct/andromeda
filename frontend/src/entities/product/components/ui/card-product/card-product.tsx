import { AppImage } from "@/shared/ui/app-image/app-image";
import type { TCardProduct } from "../../../model/types";
import styles from "./card-product.module.css";
import { IconButtonUI } from "@/shared/ui/icon-button/icon-button";
import { IconUI } from "@/shared/ui/icon";
import clsx from "clsx";

// убрать эту константу!
const PLACEHOLDER_URL = "https://placehold.co";


export type TCardProductUIProps = Omit<TCardProduct, 'id' | 'articul'>



export const CardProductUI = ({
  price,
  oldPrice,
  productName,
  reviewsNum,
  rating,
  isFavorite,
  isNew,
  // добавить возмонжость слайдера если несколькко фотографий
  images = { pathsImages: [PLACEHOLDER_URL] },
  onClick,
  currencyType = "₽",
}: TCardProductUIProps) => {
  return (
    <article className={styles["card-product"]}>
      <div className={styles["card-images-container"]}>
        <AppImage
          // подумать надо ли добавлять разные форматы картинок
          srcImage={{ jpg: { "1x": images.pathsImages[0] } }}
          descrImage={`картинка ${productName}`}
        />
        <div className={styles["card-icons-actions"]}>
          <div
            className={clsx(
              isNew ? styles["card-is-new"] : styles["card-is-old"],
            )}
          >
            {isNew ? <span>new</span> : ""}
          </div>
          <div className={styles["card-favorite-wrapper"]}>
            <IconButtonUI
              iconClass={"heart"}
              iconActiveClass={"full-heart"}
              isActive={isFavorite}
              colorIcon={"primary"}
              //  возможно придется мемоизировать
              onClick={() => onClick}
              sizeIcon={32}
            />
          </div>
        </div>
      </div>
      <div className={styles["card-product-descrip"]}>
        <div className={styles['card-product-info']}>
          <div className={styles["card-product-prices"]}>
            {oldPrice ? (
              <>
                <div className={clsx(styles["new-price"], styles["price"])}>
                  {price} {`${currencyType}`}
                </div>
                <div className={clsx(styles["old-price"], styles["price"])}>
                  {oldPrice} {`${currencyType}`}
                </div>
              </>
            ) : (
              <div className={styles["price"]}>
                {price} {`${currencyType}`}
              </div>
            )}
          </div>
          <div className={styles["card-product-name"]}>{productName}</div>
        </div>
              <div className={styles["card-product-reviews-rating"]}>
                <div className={styles["card-product-rating"]}>
                  <IconUI iconClass={"star"} colorIcon={"color-accent"} />
                  <span>{rating ? rating : "0"}</span>
                </div>
                <div className={styles["card-product-reviews"]}>
                  <IconUI iconClass={"reviews"} colorIcon={"expressive-gray"} />
                  <span>
                    {reviewsNum && reviewsNum > 0 ? reviewsNum : "0"} отзывов
                  </span>
                </div>
              </div>
              {/* e,htb */}
    
         
      </div>
    </article>
  );
};
