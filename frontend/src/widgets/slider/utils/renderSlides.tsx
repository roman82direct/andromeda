import { SlideUI } from "../components/slide/slide"
import type { TSlideItem } from "../types"

export const renderedSlides = (slides:TSlideItem[])=>{
     return slides.map((slide, index) => {
         return <SlideUI key={index} showingSlide={slide} />
 })  }