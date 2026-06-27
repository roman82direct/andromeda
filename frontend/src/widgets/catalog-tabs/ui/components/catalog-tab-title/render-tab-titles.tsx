import { CatalogTabTitle } from "./catalog-tab-title";
import styles from './catalog-tab-title.module.css'

type RenderTabTitles = {
  tabTitles: string[];
  activeTabIndex: number;
  onTabClick:(index: number)=>void;
}

export const renderCatalogTabTitles= (
  {
    tabTitles,
    activeTabIndex,
    onTabClick
    
  }: RenderTabTitles
)=>{
   return <div className={styles['catalog-tab-titles']}>
    {
            //  заголовки показываем все и активный выделяем
          
            
           tabTitles.map((tabTitle, index) => (
              <button
                key={index}
                onClick={() => onTabClick(index) }
              >
                 <CatalogTabTitle 
                  tabTitle={tabTitle}
                  activeTab={activeTabIndex === index}
              />
              </button>
            ))
            
            
          }
   
   </div>
}