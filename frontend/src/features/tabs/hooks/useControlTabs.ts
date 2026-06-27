import { useState } from "react";

export const useControlTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  //  см шаблон как правильно переключать ?????????????????
  const handleActiveTab = (numTab: number) => {
    setActiveTab(numTab);
  };

  return {
    activeTab,
    handleActiveTab 
  }
}