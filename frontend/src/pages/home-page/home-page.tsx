import type { FC } from "react";
import { HomePageUI } from "./ui";
import { sliderStore } from "./model/sliderStore";
export const HomePage: FC = () => {
  return <HomePageUI banners={sliderStore}/>;
};
