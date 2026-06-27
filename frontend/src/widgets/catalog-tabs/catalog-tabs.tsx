import { renderCatalogTabContent } from "./ui/components/catalog-tab-content/render-tab-content";
import { catalog } from "./model/dataTabs";
import { Tabs } from "@/features/tabs/tabs";
import type { TCatalogContent } from "./types";
import { renderCatalogTabTitles } from "./ui/components/catalog-tab-title/render-tab-titles";

export const CatalogTabs = () => {
  return (
    <>
      <Tabs<TCatalogContent[]>
        tabs={catalog}
        renderTabTitles={renderCatalogTabTitles}
        renderTabContent={renderCatalogTabContent}
      />
    </>
  );
};
