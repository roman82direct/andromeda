import { useState } from "react";
import { CatalogTabsUI } from "./ui/catalog-tabs"
import { renderTabContent } from "./utils/render-tab-content";
import { catalog } from "./model/dataTabs";

// фича или виджет
export const CatalogTabs = ()=>{

  const [activeTab, setActiveTab] =useState(0);
  //  см шаблон как правильно переключать ?????????????????
  const handleActiveTab = (numTab: number) => {
    setActiveTab(numTab);
  }
//  как то получать табы  catalog  ?

  return <>
     <CatalogTabsUI 
        tabs={catalog} 
        activeTab={activeTab} 
        onTabsClick={handleActiveTab}
        renderTabContent={renderTabContent}
        />
        
  </>
}