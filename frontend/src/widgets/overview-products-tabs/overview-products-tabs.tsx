import { renderOverviewProductsTabContent} from "./ui/components/overview-porduct-tab-content/render-tab-content";
import { overviewProducts } from "./model/overviewProducts";
import { Tabs } from "@/features/tabs/tabs";
import type { TCatalogContent } from "./types";
import { renderCatalogTabTitles } from "./ui/components/overview-product-tab-title/render-tab-titles";
import { ButtonUI } from "@/shared/ui/button";
import styles from './ui/overview-products-tabs.module.css';

export const OverviewProductsTabs = () => {
  return (
    <>
      <Tabs<TCatalogContent[]>
        tabs={overviewProducts}
        renderTabTitles={renderCatalogTabTitles}
        renderTabContent={renderOverviewProductsTabContent}
      />
      <div className={styles['overview-products-tabs']}>
        <ButtonUI 
          color={'primary'} 
          variant={'filled'}
          to={'/catalog'}
          
          >
            В каталог
          </ButtonUI>
      </div>
    </>
  );
};
