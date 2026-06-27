import { useControlTabs } from "./hooks/useControlTabs";
import type { TabsProps } from "./types";
import { TabsUI } from "./ui/tabs";



// использование дженериков для react
export const Tabs = <T,>({
  tabs,
  renderTabContent,
  renderTabTitles
}:TabsProps<T>) => {

  //  все в хук feature  переключает табы
  const { activeTab, handleActiveTab } = useControlTabs();
  //  как то получать табы  catalog  ?

  return (
    <>
      <TabsUI
      //  какой то контент массив табов - и в типах
      //  мы можем указать что м б табов
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleActiveTab}
        //  что то что рендерит контетн
        renderTabContent={renderTabContent}
        //  функция что нендерит табы
        renderTabTitles={renderTabTitles}
      />
    </>
  );
};
