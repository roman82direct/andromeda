// import type { ReactNode } from "react

import type { JSX } from "react/jsx-runtime";



export type TCatalogContent = {
  image: string;
  descpImage: string;
}


export type Tab = {
  tabTitle: string;
  tabContent: TCatalogContent[];
  isActive?: boolean;

}


export type TabProps = {
  tabs: Tab[];
  onTabsClick?: (numTab: number)=>void;
  activeTab: number;
  renderTabContent: (tabContent: TCatalogContent[])=>JSX.Element;
}
