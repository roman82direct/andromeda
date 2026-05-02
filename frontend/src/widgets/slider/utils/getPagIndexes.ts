//  перенести функцию ниже в sliders/utils слайдера
export const getPagIndexes = (
  currentIndexSlide: number,// текущий индекс слайда (начинается с 0)
  showPagSize: number, // сколько точек показывать одновременно (обычно 3)
  totalSlides: number,// общее количество слайдов
): number[] => {
  // 1. Создаём массив всех возможных индексов: [0, 1, 2, 3, ..., totalSlides-1]
  const allIndexexSlides =Array.from({length:  totalSlides}, (_,i)=>i);
  // определяем начало тройки где находится тек индекс

  // В каком блоке по N элементов находится число?
  // "находим число где оно в списке из n элементов в подсписке из m"
  // разбиение на блоки фиксированного размера Math.floor(i / m) * m
  // В каком блоке по m элементов находится элемент i
  // и где начинается этот блок?
  // находим блок в котором находится индекс пагинации тек слайда (округляя вниз до ближ целого)
  const findBlock = Math.floor(currentIndexSlide / showPagSize);
  //  "выделяем" этот блок
  //   1.находим начало этого блока
  const startIndex = findBlock * showPagSize;

  // 2. определили конечный элемент тройки
  const endIndex = startIndex + showPagSize - 1;
  //  3. определим тройку
  return allIndexexSlides.slice(startIndex, endIndex + 1);
  
};
