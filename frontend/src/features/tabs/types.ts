import type { CardProduct } from "@/entities/product/model/types";
import type { TImage } from "@/shared/types/types";
import type React from "react";
// import type { JSX } from "react/jsx-runtime";

export type TabTitle = string;
// мастштабировать!!!

//  для каталога на 1 странице
export type TCatalogContent = {
  image: TImage;
  descpImage: string;
  link: string;
};

// export type

export type TabContent = TCatalogContent | CardProduct;

//  возможно для карточек
// export type Tab = {
//   tabTitle: TabTitle;
//   tabContents: TabContent[];
//   isActive?: boolean;
// };

export type TabData<T = unknown> = {
  tabTitle: TabTitle;
  tabContents: T; // Здесь может быть любой ваш тип данных
  [key: string]: unknown;
  isActive?: boolean;
};

export type TitleProps = {
  tabTitles: TabTitle[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
};

// jsx element или react node отличие!!!!!!

export type renderContentCallback<T> = (content: T) => React.ReactNode;

export type renderTitlesCallback = (dataTitles: TitleProps) => React.ReactNode;

export type TabPropsUI<T = unknown> = {
  tabs: TabData<T>[];
  onTabClick: (numTab: number) => void;
  activeTab: number;
  renderTabContent: renderContentCallback<T>;
  renderTabTitles: renderTitlesCallback;
};

export type TabsProps<T = unknown> = Omit<
  TabPropsUI<T>,
  "onTabClick" | "activeTab"
>;
