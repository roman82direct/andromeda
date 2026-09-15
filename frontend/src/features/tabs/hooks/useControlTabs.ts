import { useState } from "react";

export const useControlTabs = (setIsAnimation?: boolean) => {
  const [activeTab, setActiveTab] = useState(0);

  const [animation, setAnimation] = useState(false);
  //  см шаблон как правильно переключать ?????????????????

  const runAnimationTab = () => {
    setAnimation(true);

    const timeout = setTimeout(() => {
      setAnimation(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  };

  const handleActiveTab = (numTab: number) => {
    setActiveTab(numTab);
    if (setIsAnimation) {
      runAnimationTab();
    }
  };

  return {
    activeTab,
    handleActiveTab,
    animation,
    runAnimationTab,
  };
};
