import { OverviewProductTabTitle } from "./overview-product-tab-title";
import styles from "./overview-product-tab-title.module.css";

type RenderTabTitles = {
  tabTitles: string[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
};

export const renderCatalogTabTitles = ({
  tabTitles,
  activeTabIndex,
  onTabClick,
}: RenderTabTitles) => {
  return (
    <ul className={styles["catalog-tab-titles"]}>
      {
        //  заголовки показываем все и активный выделяем

        tabTitles.map((tabTitle, index) => (
          <li key={index}>
             <button  onClick={() => onTabClick(index)}>
              <OverviewProductTabTitle
                tabTitle={tabTitle}
                activeTab={activeTabIndex === index}
              />
            </button>
          </li>
         
        ))
      }
    </ul>
  );
};
