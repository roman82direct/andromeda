import styles from "./home-page.module.css";
import { Slider } from "@/widgets/slider"; 
import type { FC } from "react";
import type { TSlideItem } from "@/shared/types/ui/slider";


type THomePageProps = {
    banners: TSlideItem[];
}


export const HomePageUI: FC<THomePageProps> = ({banners}) => {
  
  return (
    <div className={styles.home}>
      <section className={styles['home-banner']}>
        <Slider sliders={banners}/>
      </section>
      
    </div>
  );
};
