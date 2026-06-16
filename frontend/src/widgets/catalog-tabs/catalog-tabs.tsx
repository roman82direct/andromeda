import { useState } from "react";
import { CatalogTabsUI } from "./ui/catalog-tabs"
import type { Tab } from "./types";
import { renderTabContent } from "./utils/render-tab-content";

// фича или виджет
export const CatalogTabs = ()=>{

  const [activeTab, setActiveTab] =useState(0);

  const handleActiveTab = (numTab: number) => {
    setActiveTab(numTab);
  }
//  как то получать табы
  const catalog:Tab[] = [
    {
      tabTitle:'Категории',
      tabContent: [{
        image:'картинка 1',
        descpImage:'Домашний текстиль'
      }],
      isActive: true
    },
    {
      tabTitle: 'Коллекции',
      tabContent:[ {
        image:'картинка 2',
        descpImage:'Посуда'
      }],
      isActive: false
    },
    
  ]
  return <>
     <CatalogTabsUI 
        tabs={catalog} 
        activeTab={activeTab} 
        onTabsClick={handleActiveTab}
        renderTabContent={renderTabContent}
        />
        
  </>
}