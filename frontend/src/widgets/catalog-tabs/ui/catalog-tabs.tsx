import clsx from "clsx";
import type { TabProps } from "../types"
import styles  from './catalog-tabs.module.css';





export const CatalogTabsUI = (
  {
    tabs,
    activeTab,
    onTabsClick,
    renderTabContent,
  }:TabProps
)=>{
    // вопрос масштабирование табов ??
  const activeTabTitle =    activeTab ? 'activeTabTitle' : '';

  return <div>
      
        
          <div className={styles["tabs"]}>
            <div className={styles["tab-titles"]}>
                {
                  //  заголовки показываем все и активный выделяем
                  tabs.map((tab, index)=>(
                    <button key={index} onClick={onTabsClick ? ()=> onTabsClick(index) : ()=>{}}>
                       <h4 className={clsx(styles['tab-title'], styles[activeTabTitle])}>{tab.tabTitle}</h4>
                    </button>
                   
                  ))
                }
                
            </div>
                {/* // показываем только контент активного слайда
                  // tabs.map((tab)=>(
                  //   <div className={styles['tab-content']}>{tab.tabContent}</div>
                  */}
                 <div className={styles['tab-content']}>
                    {renderTabContent(tabs[activeTab].tabContent)}
                  </div>
              </div>
  </div>
}