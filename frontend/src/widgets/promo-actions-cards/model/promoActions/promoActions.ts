import type { TDescriptWithImageLink } from "@/shared/types/types";
import news from "../../../../assets/images/home-page/catalog-cards/card1/jpg/1x/Rectangle 5.jpg";
import sales from "../../../../assets/images/home-page/catalog-cards/card2/1x/Rectangle 5 (1).jpg";
import inStore from "../../../../assets/images/home-page/catalog-cards/card3/1x/Rectangle 5 (2).jpg";

export const promoActions: TDescriptWithImageLink[] = [
  {
    descpImage: "Новинки",
    link: "",
    srcImage: {
      jpg: {
        "1x": news,
        "2x": "",
      },
    },
  },
  {
    descpImage: "Распродажа",
    link: "",
    srcImage: {
      jpg: {
        "1x": sales,
        "2x": "",
      },
    },
  },
  {
    descpImage: "В наличии",
    link: "",
    srcImage: {
      jpg: {
        "1x": inStore,
        "2x": "",
      },
    },
  },
];
