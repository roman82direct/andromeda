import type { TImage } from "@/shared/types/types";
import styles from "./app-image.module.css";
import clsx from "clsx";

export type ImageProps = {
  descrImage?: string;
  srcImage: TImage;
  className?: string;
};

//  придумать дефолт блок стайл для картинки?

export const AppImage = ({ descrImage, srcImage, className }: ImageProps) => {
  const styleClass = className ? className : "";
  const defaultClass = "defaultClassImg";
  return (
    <picture className={styles["pictureImg"]}>
      {srcImage?.avif?.["1x"] && (
        <source
          srcSet={
            srcImage?.avif?.["2x"]
              ? `${srcImage?.avif?.["1x"]} 1x, ${srcImage.avif["2x"]} 2x`
              : srcImage?.avif?.["1x"]
          }
          type="image/avif"
        />
      )}
      {srcImage?.webp?.["1x"] && (
        <source
          srcSet={
            srcImage?.webp?.["2x"]
              ? `${srcImage?.webp?.["1x"]} 1x, ${srcImage.webp["2x"]} 2x`
              : srcImage?.webp?.["1x"]
          }
          type="image/webp"
        />
      )}
      <img
        className={clsx(styles[defaultClass], styles[styleClass])}
        src={srcImage?.jpg?.["1x"] || ""}
        srcSet={
          srcImage?.jpg?.["2x"]
            ? `${srcImage?.jpg?.["1x"]} 1x, ${srcImage.jpg["2x"]} 2x`
            : undefined
        }
        alt={descrImage ? descrImage : "здесь дб картинка"}
        loading="lazy"
      />
    </picture>
  );
};
