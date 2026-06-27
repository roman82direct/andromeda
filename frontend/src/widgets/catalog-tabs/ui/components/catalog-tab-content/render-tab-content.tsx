import type { TCatalogContent } from "../../../types";
import { CatalogTabContent } from "./catalog-tab-content";
import styles from './catalog-tab-content.module.css';

export const renderCatalogTabContent  = (content: TCatalogContent[]) => {
  return (
    <div className={styles['catalog-tab-content']}>
      {
        content.map((contentItem, index) => {
          const key = contentItem.link || index;
          return (
            <CatalogTabContent
              index={key}
              link={contentItem.link}
              srcImage={contentItem.image}
              descpImage={contentItem.descpImage}
            />
          );
        })
      }
    </div>
  );
};
