import type { TActionUser, TImage } from "@/shared/types/types";

export type ThemeSlide = "dark" | "light";

export type TSlideItem = {
  image: TImage;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme: ThemeSlide;
};



