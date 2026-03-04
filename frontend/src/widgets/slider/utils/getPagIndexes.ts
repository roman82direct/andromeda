//  перенести функцию ниже в sliders/utils слайдера
export  const getPagIndexes = (currentIndexSlide:number,showPagSize:number, sliders:unknown[]):number[]=>{
//   находим все  индексы слайдов - используем их отображ для пагинации
  const allIndexexSlides = Object.keys(sliders).map(item=>Number(item))
         // определяем начало тройки где находится тек индекс
      
      // В каком блоке по N элементов находится число?
      // "находим число где оно в списке из n элементов в подсписке из m"
      // разбиение на блоки фиксированного размера Math.floor(i / m) * m
      // В каком блоке по m элементов находится элемент i
      // и где начинается этот блок?
        // находим блок в котором находится индекс пагинации тек слайда (округляя вниз до ближ целого)
         const findBlock = Math.floor(currentIndexSlide/showPagSize);
        //  "выделяем" этот блок
        //   1.находим начало этого блока
         const startIndex =  findBlock *showPagSize
      
          // 2. определили конечный элемент тройки
      const endIndex =  startIndex + showPagSize-1;
      //  3. определим тройку
        const forIndexesPag = allIndexexSlides.slice( startIndex,endIndex+1);
        return forIndexesPag
      }