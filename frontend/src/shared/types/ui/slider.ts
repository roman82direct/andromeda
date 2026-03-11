import type { TActionUser } from "../types";

export type TSlideItem = {
  image: string;
  title: string;
  desc?: string;
  pathsForActions: TActionUser[];
  typeTheme:'dark' | 'light'
};
