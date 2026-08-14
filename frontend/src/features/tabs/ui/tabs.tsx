import { useMemo } from "react";
import type { TabPropsUI } from "../types";
import styles from "./tabs.module.css";

export const TabsUI = <T,>({
  tabs,
  activeTab,
  onTabClick,
  renderTabContent,
  renderTabTitles,
  isAnimation,
}: TabPropsUI<T>) => {
  // выделяем титлы отдельно
  const tabTitles = useMemo(() => tabs.map((tab) => tab.tabTitle), [tabs]);
  return (
    <div className={styles["tabs"]}>
      <div className={styles["container-tab-titles"]}>
        {renderTabTitles({
          tabTitles: tabTitles,
          onTabClick: onTabClick,
          activeTabIndex: activeTab,
        })}
      </div>
      <div className={styles["container-tab-content"]}>
        {/* обособление таб контента */}
        {renderTabContent(tabs[activeTab].tabContents, isAnimation)}
      </div>
    </div>
  );
};
