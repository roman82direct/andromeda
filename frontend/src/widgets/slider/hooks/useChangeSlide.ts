import type { TSlideItem } from "@/shared/types/ui/slider";
import { useCallback, useEffect, useState } from "react";
// https://www.google.com/search?sourceid=chrome&aep=42&source=chrome.crn.rb&q=const+getPagIndexes+%3D+%28currentIndexSlide%3Anumber%2CshowPagSize%3Anumber%2C+sliders%3Aunknown%5B%5D%29%3Anumber%5B%5D%3D%3E%7B%0A++%D1%8D%D1%82%D1%83+%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8+%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE+%D0%BF%D0%BE%D0%BB%D0%BE%D0%B6%D0%B8%D1%82%D1%8C+%D0%B2+%D0%BF%D0%B0%D0%BF%D0%BA%D1%83+utils+%D0%B2%D0%B8%D0%B6%D0%B4%D0%B5%D1%82%D0%B0slider&mstk=AUtExfDiVZfYGQapSZnj_yuqaPJdXd34imL1CXM_H0lgcxtzzb-xAo69FjedWvYLfXly1vfhXPv697RUzQ02XfqnsBNzcbTcI2yzjaoWxVKjX-OsY748VuY5744vB3Slol3UYj7mX5rCh9zMRc1Le4RNNHmOnPGuTw4zaTZ7XNuzAWRrN40evNtmaq8YD0OVch7T85XDv1Ac5CzoteNYvS4FxkNmzuT2_XanQQuPratf5iL0OplZ4IBhTOPUxm0ZY_42ZbkwObCLn7XAXB6PD8Ls6z18YiyyqjtW5w0&csuir=1&mtid=aw2oabzMLvbEwPAPyobwuQI&lns_mode=cvst&udm=50
//  сделай автоматич переключение слайдов чтобы при наведении на слайд оно прекращалось
export const useChangeSlide = (sliders: TSlideItem[])=>{
  //работа с показом слайдов и их перелистыванием
  const [indCurrSlide, setIndexSlide] = useState<number>(0);

    // useCallback возвращает запомненную версию функции, которая не создаётся заново при каждом рендере, а будет меняться
  // только если изменятся зависимости (sliders.length или indCurrSlide).
  //  создать хук дляслайда и выложить в папку sliders/hooks
  const handleChangeSlide = 
    useCallback((value: "increment" | "decrement") => {
      setIndexSlide((prev)=>{
         if (value === "increment") {
        //  меняем слайд 'вперед'
          return prev >= sliders.length - 1 ? 0 : prev + 1;
         }else{
          //  перемещение влево value === 'decrement' - смотрим предыдущий слайд
          return  prev <= 0 ? sliders.length - 1 : prev - 1;

         }
      })
  
    }, [sliders.length])
//  автоматич показ слайдов
     useEffect(() => {
        const intervalOfMovingSliders = setInterval(() => {
          handleChangeSlide("increment");
        }, 4000);
        return () => {
          clearInterval(intervalOfMovingSliders);
        };
      }, [handleChangeSlide]);
   
  
return {
    indCurrSlide, // Номер текущего слайда
    setIndexSlide, // Возможность напрямую прыгнуть на любой слайд (например, по клику на точку)
    handleChangeSlide // // Функция для кнопок "Вперед" и "Назад" 
}
}