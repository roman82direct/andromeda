import clsx from "clsx";
import styles from "./overview-product-tab-title.module.css";

type OverviewProductTabTitleProps = {
  tabTitle: string;
  activeTab: boolean;
};

export const OverviewProductTabTitle = ({
  tabTitle,
  activeTab,
}: OverviewProductTabTitleProps) => {
  return (
    <>
      <span
        className={clsx(
          styles["catalog-tab-title"],
          activeTab ? styles["activeTabTitle"] : "",
        )}
      >
        {tabTitle}
      </span>
    </>
  );
};
