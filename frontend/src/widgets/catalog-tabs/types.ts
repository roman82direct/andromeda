// import type { ReactNode } from "react

// import type { CardProduct } from "@/entities/product/model/types";
import type { TImage } from "@/shared/types/types";
import type { JSX } from "react/jsx-runtime";



export type TCatalogContent = {
  image: TImage;
  descpImage: string;
  link:string
}

//  возможно для карточек
export type Tab = {
  tabTitle: string;
  tabContent: TCatalogContent[]
  isActive?: boolean;

}


export type TabProps = {
  tabs: Tab[];
  onTabsClick?: (numTab: number)=>void;
  activeTab: number;
  renderTabContent: (tabContent: TCatalogContent[])=>JSX.Element;
}
