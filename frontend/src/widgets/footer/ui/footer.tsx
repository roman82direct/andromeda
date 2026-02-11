import { type FC } from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { Logo } from "../../../shared/ui/logo/logo";
import { SubscribeForm } from "../../../features/subscribe-form";
import { FooterListUI, type SubListLinks } from "./footer-list/footer-list";
import { IconMenuUI } from "../../../shared/ui/icon-menu";
import type { TIconType } from "@/shared/types/ui/icon";

type TFooterUIProps = {
  columnsListsLinks?: SubListLinks[][];
  socialLinksIcons?: TIconType[];
};

export const FooterUI: FC<TFooterUIProps> = ({
  columnsListsLinks,
  socialLinksIcons,
}) => {
  //  подумать  - поделить длину массива иконок на 2 - округлить и обрезать по 2 массива
  const lengthArr = socialLinksIcons?.length ? socialLinksIcons.length : 0;
  const middleIndex =
    lengthArr && lengthArr > 0 ? Math.floor(lengthArr / 2) : 0;
  const leftPartIcons: TIconType[] | undefined = socialLinksIcons && [
    ...socialLinksIcons.slice(0, middleIndex + 1),
  ];
  const rightPartIcons: TIconType[] | undefined = socialLinksIcons && [
    ...socialLinksIcons.slice(middleIndex + 1, lengthArr),
  ];
  // const iconsSize = 20;
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-head"]}>
          <div className={styles["footer-wrapper-logo"]}>
            <Logo color={"dark-background"} />
          </div>
          <div className={styles["footer-personal"]}>
            <h3 className={styles["footer-title"]}>
              Персональные предложения, ранний доступ к новым коллекциям и
              скидка 5% на первый заказ при подписке на рассылку
            </h3>
            <div className={styles["footer-subscribe-container"]}>
              <SubscribeForm />
            </div>
          </div>
        </div>

        <div className={styles["footer-body"]}>
          {columnsListsLinks &&
            columnsListsLinks.map((column, indexColumn) => (
              <div key={indexColumn} className={styles["footer-body-column"]}>
                <FooterListUI listsLinks={column} />
              </div>
            ))}
        </div>
      </div>
      <div className={styles["footer-copyright"]}>
        {Boolean(leftPartIcons && leftPartIcons?.length > 0) && (
          <div className={styles["footer-nav"]}>
            {leftPartIcons && (
              <IconMenuUI
                iconsSize={23}
                navIcons={leftPartIcons}
                variantMenu="footer"
              />
            )}
          </div>
        )}
        <div className={styles["footer-copyright-logo"]}>
          <Link className={styles["logo-link"]} to={"/"}>
            © Andromeda
          </Link>
        </div>
        {Boolean(rightPartIcons && rightPartIcons?.length > 0) && (
          <div className={styles["footer-nav"]}>
            {rightPartIcons && (
              <IconMenuUI
                iconsSize={35}
                navIcons={rightPartIcons}
                variantMenu="footer"
              />
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

// Footer – главный контейнер футера.

// Footer-head – верхняя часть футера:

// Logo – логотип

// Subscribe – форма подписки (инпут + кнопка)

// Footer-nav – навигация футера:

// Footer-menu – меню

// Footer-list – список пунктов

// Footer-sublist – подсписки (например, ссылки в подкатегории)

// Footer-copyright – нижняя часть футера с копирайтом.
