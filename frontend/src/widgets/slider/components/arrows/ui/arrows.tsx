import { IconButtonUI } from "@/shared/ui/icon-button";
import styles from "./arrows.module.css";

import type { TThemeElementsPage } from "@/shared/types/types";
import { memo } from "react";
import type { TBlockArrow } from "@/widgets/slider/model/contexts";
import type { TArrows } from "../types";

type ArrowUIProps = {
  arrows: TArrows;
  themeArrows: TThemeElementsPage;
  isDisabled?: boolean;
  isBlockArrow?: TBlockArrow;
};

export const ArrowsUIComponent = ({
  arrows,
  themeArrows,
  isDisabled,
  isBlockArrow,
}: ArrowUIProps) => {
  // const hideClassArrow = isHideArrow ? "" : ""
  const isLeftArrow = isBlockArrow?.isLeftArrow;
  const isRightArrow = isBlockArrow?.isRightArrow;

  return (
    <div className={styles["slider-arrows"]}>
      <IconButtonUI
        key={arrows.right.key}
        onClick={arrows.right.onClick}
        iconClass={arrows.right.icon}
        isActive={false}
        colorIcon={themeArrows}
        sizeIcon={33}
        isDisabled={isDisabled || isRightArrow}
      />
      <IconButtonUI
        key={arrows.left.key}
        onClick={arrows.left.onClick}
        iconClass={arrows.left.icon}
        isActive={false}
        colorIcon={themeArrows}
        sizeIcon={33}
        isDisabled={isDisabled || isLeftArrow}
      />
    </div>
  );
};

export const ArrowsUI = memo(ArrowsUIComponent);
ArrowsUI.displayName = "ArrowsUI";
