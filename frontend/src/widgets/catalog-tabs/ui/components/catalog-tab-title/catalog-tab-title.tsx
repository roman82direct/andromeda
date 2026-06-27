import clsx from "clsx";
import styles from "./catalog-tab-title.module.css";

type CatalogTitleProps = {
  tabTitle: string;
  activeTab: boolean;
};

export const CatalogTabTitle = ({ tabTitle, activeTab }: CatalogTitleProps) => {
  return (
    <>
      <h4
        className={clsx(
          styles["catalog-tab-title"],
          activeTab ? styles["activeTabTitle"] : "",
        )}
      >
        {tabTitle}
      </h4>
    </>
  );
};
