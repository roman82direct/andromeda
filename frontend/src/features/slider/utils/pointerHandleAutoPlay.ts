
type ArgsHandleAutoPlay = {
    pointerType:string,
    callback: ()=>void,
    enabled:boolean,
    pointerTypes: string[]
  }

  
export const pointerHandleAutoPlay =  ({pointerType, callback,enabled,pointerTypes}:ArgsHandleAutoPlay)=>{
    if(!enabled) return;
    if(pointerTypes.includes(pointerType)) {
      callback();
    }
  }