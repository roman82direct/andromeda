type ArgsHandleAutoPlay = {
  pointerType: string;
  callback: () => void;
  enabledAutoPlay: boolean;
  pointerTypes: string[];
};

export const pointerHandleAutoPlay = ({
  pointerType,
  callback,
   enabledAutoPlay,
  pointerTypes,
}: ArgsHandleAutoPlay) => {
  if (!enabledAutoPlay) return;
  if (pointerTypes.includes(pointerType)) {
    callback();
  }
};
// применение карирования
//  если мышка или тач на объекте останавливаем автоплей
export   const stopHandleAutoPlay = (e: React.PointerEvent<HTMLDivElement>)=>(
    {stopAutoPlay, pointerTypes}:{stopAutoPlay:()=> void, pointerTypes:string[]},
     enabledAutoPlay: boolean
  ) => {
    pointerHandleAutoPlay({
      pointerType: e.pointerType,
      callback: stopAutoPlay,
      enabledAutoPlay,
      pointerTypes: pointerTypes,
    });
  };
 //  если мышка или тач ушла с обхекта восстанавливаем автоплей
export   const startHandleAutoPlay = (e: React.PointerEvent<HTMLDivElement>)=>(
    {runAutoPlay, pointerTypes}:{runAutoPlay:()=>void, pointerTypes:string[]},
     enabledAutoPlay: boolean
  ) => {
    pointerHandleAutoPlay({
      pointerType: e.pointerType,
      callback: runAutoPlay,
      enabledAutoPlay,
      pointerTypes: pointerTypes,
    });
  };
