import type React from "react";

export type TabTitle = string;

export type TabData<T = unknown> = {
  tabTitle: TabTitle;
  tabContents: T; // Здесь может быть любой  тип данных
  [key: string]: unknown;
  isActive?: boolean;
};

export type TitleProps = {
  tabTitles: TabTitle[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
};

export type renderContentCallback<T> = (
  content: T,
  isAnimation?: boolean,
) => React.ReactNode;

export type renderTitlesCallback = (dataTitles: TitleProps) => React.ReactNode;

export type TabPropsUI<T = unknown> = {
  tabs: TabData<T>[];
  onTabClick: (numTab: number) => void;
  activeTab: number;
  renderTabContent: renderContentCallback<T>;
  renderTabTitles: renderTitlesCallback;
  isAnimation?: boolean;
};

export type TabsProps<T = unknown> = Omit<
  TabPropsUI<T>,
  "onTabClick" | "activeTab"
>;
