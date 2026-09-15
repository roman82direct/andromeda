import { AppImage } from "@/shared/ui/app-image/app-image";
import type { CardProductUIProps } from "../../model/types";
import styles from "./card-product.module.css";
import { IconButtonUI } from "@/shared/ui/icon-button/icon-button";
import { IconUI } from "@/shared/ui/icon";
// cм сюда
// https://www.google.com/search?q=%2F%2F+%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B0+%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0+export+type+CardProductProps+%3D+%7B+price%3A+number%3B+oldPrice%3F%3A+number%3B+productName%3A+string%3B+reviews%3A+ReviewCard%5B%5D%3B+rating%3A+number%3B+isFavorite%3A+boolean%3B+isNew%3F%3Aboolean%3B+images%3Astring%5B%5D%3B+%7D%3B&sourceid=chrome&ie=UTF-8&amc=1&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTMyODVqMGozMagCBrACAeoHCggBEAAYACAAKAA&oq=%2F%2F+%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B0+%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0%250Aexport+type+CardProductProps+%3D+%7B%250A++price%3A+number%3B%250A++oldPrice%3F%3A+number%3B%250A++productName%3A+string%3B%250A++reviews%3A+ReviewCard%5B%5D%3B%250A++rating%3A+number%3B%250A++isFavorite%3A+boolean%3B%250A++isNew%3F%3Aboolean%3B%250A++images%3Astring%5B%5D%3B%250A%7D%3B&aep=42&cud=0&source=chrome.crn.rb&mstk=AUtExfA7tCbYDc6wYfbgEHUYngbgxrjRFuootKGmcl736uXYOKnwGpwuFscOM72ye63YtDlNEHleevtIA-nPa4DuZF-LQVY2OQ1sxh3Nszsacod0Qe78ugnfD-t0URFAGF6TVMzYwGqxgGuLJTUsl6ByreqtZIHdlLmG0U0h41uUa3sAulVfmiW7FCcAuqzvUSHucojVxP1VnDgbYAqgCOPB3AgJmLZE3YjjEiaw2NyQEAE4Jl2T0p8Gt5zl7odlHj-MTOWJTEF2fVoWIQ&csuir=1&mtid=C2RKauKQHrSgi-gP-pqDyAU&lns_mode=cvst&udm=50

const PLACEHOLDER_URL = "https://placehold.co";

export const CardProductUI = ({
  price,
  oldPrice,
  productName,
  reviewsNum,
  rating,
  isFavorite,
  isNew,
  images = { pathsImages: [PLACEHOLDER_URL] },
  //подумать
}: CardProductUIProps) => {
  //   const handleLike = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // Вызов вашей функции добавления в избранное    = > вешаем на иконку лайка
  // };

  return (
    <article className={styles["card-product"]}>
      <div className={styles["images-container"]}>
        <AppImage srcImage={{ jpg: { "1x": images.pathsImages[0] } }} />
        {/* добавить абс позиц */}
        <div className={styles["card-icons-actions"]}>
          <div className={styles["is-new"]}>{isNew ? "New" : ""}</div>
          {/* иконка лайка если лайкнуто */}
          <IconButtonUI
            iconClass={"heart"}
            iconActiveClass={"full-heart"}
            isActive={isFavorite}
            colorIcon={"primary"}
            //  продумать сам лайк
          />
        </div>
      </div>
      <div></div>
      <div className={styles["card-product-descrip"]}>
        <div className={styles["card-product-prices"]}>
          {oldPrice ? (
            <>
              <div className={styles["old-price"]}>{oldPrice}</div>
              <div className={styles["new-price"]}>{price}</div>{" "}
            </>
          ) : (
            <div className={styles["price"]}>{price}</div>
          )}
        </div>
        <div className={styles["card-product-name"]}>{productName}</div>
        <div className={styles["card-product-reviews-rating"]}>
          <span className={styles["card-product-reviews"]}>
            <IconUI iconClass={"reviews"} colorIcon={"primary"} />

            {reviewsNum}
          </span>
          <span className={styles["card-product-rating"]}>
            <IconUI iconClass={"star"} colorIcon={"primary"} />
            {rating}
          </span>
        </div>
      </div>
    </article>
  );
};
