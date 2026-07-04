import clsx from "clsx";
import type { TCatalogContent } from "../../../types";
import { CatalogTabContentItem } from "./catalog-tab-content-item";
import styles from "./catalog-tab-content.module.css";

export const renderCatalogTabContent = (content: TCatalogContent[], isAnimation?: boolean) => {
  return (
    <div 
      role={'tabpanel'}
      className={
        clsx(
          styles["catalog-tab-content"], 
          isAnimation && styles["fadeInAnimation"]
            )
        }>
      {content.map((contentItem, index) => {
        const key = contentItem.link || index;
        return (
          <CatalogTabContentItem
            key={key}
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
