import type { TActionUser, TImage } from "@/shared/types/types";

export type BasedSlide = {
  typeTheme?: ThemeSlide;
}
export type ThemeSlide = "dark" | "light";

export type TPromoSlideItem = {
  image: TImage;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme: ThemeSlide;
};
