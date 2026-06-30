import type { TImage } from "@/shared/types/types";
import styles from './app-image.module.css';
import clsx from "clsx";

export type ImageProps = {
  descrImage?: string;
  srcImage: TImage;
  className?: string;
};

//  придумать дефолт блок стайл для картинки?

export const AppImage = ({ descrImage, srcImage, className }: ImageProps) => {
  const styleClass = className ?  className : '';
  const defaultClass = 'defaultClassImg';
  return (
    <picture>
      {srcImage.avif && (
        <source
          srcSet={`${srcImage.avif["1x"]} 1x, ${srcImage.avif["2x"]} 2x`}
          type="image/avif"
        />
      )}
      {srcImage.webp && (
        <source
          srcSet={`${srcImage.webp["1x"]} 1x,${srcImage.webp["2x"]} 2x`}
          type="image/webp"
        />
      )}
      <img
        className={clsx(styles[defaultClass],styles[styleClass] )}
        src={srcImage.jpg["1x"]}
        srcSet={`${srcImage.jpg["2x"]} 2x`}
        alt={descrImage ? descrImage : "здесь дб картинка"}
        loading="lazy"
      />
    </picture>
  );
};
