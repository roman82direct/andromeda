import clsx from "clsx";
import type { TCatalogContent } from "../../../types";
import { CatalogTabContentItem } from "./catalog-tab-content";
import styles from "./catalog-tab-content.module.css";

export const renderCatalogTabContent = (content: TCatalogContent[], isAnimation?: boolean) => {
  
  const classNameTab = `${isAnimation && 'fadeInAnimation'}`;

  
  return (
    <div className={clsx(styles["catalog-tab-content"], styles[classNameTab])}>
      {content.map((contentItem, index) => {
        const key = contentItem.link || index;
        return (
          <CatalogTabContentItem
            index={key}
            link={contentItem.link}
            srcImage={contentItem.image}
            descpImage={contentItem.descpImage}
            isAnimation={isAnimation}
          />
        );
      })}
    </div>
  );
};
