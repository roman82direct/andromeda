import clsx from "clsx";
import type { TCatalogContent } from "../../../types";
import { OverviewProductContentItem } from "./overview-product-tab-content-item";
import styles from "./overview-product-tab-content.module.css";

export const renderOverviewProductsTabContent = (content: TCatalogContent[], isAnimation?: boolean) => {
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
        const key =  index;
        return (
          <OverviewProductContentItem
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
