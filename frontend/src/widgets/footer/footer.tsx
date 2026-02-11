import { FooterUI } from "./ui";
import { type FC } from "react";
import { navIconsForFooter } from "./data/footer-icons";
import { footerLinks } from "./data/footer-links";

export const Footer: FC = () => {
  return (
    <FooterUI
      columnsListsLinks={footerLinks}
      socialLinksIcons={navIconsForFooter}
    />
  );
};
