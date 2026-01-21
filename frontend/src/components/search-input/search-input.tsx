import { useEffect, useState, type FC } from "react";
import { SearchInputUI } from "../ui/search-input";

export const SearchInput: FC = () => {
  const [value, setValue] = useState<string>('');
  // const dispatch = useDispatch();
  //  нужен ли сабмит формы? = > как то связть его со стором или Api думать?
  useEffect(()=>{
    // сохранение значение поиска в стор? подумать
    // допустим
    // dispatch(setSearchInput(value));
  },[value])
  //  здесь можно взять из стора - популярные запросы и историю и кинуть в UI
  
  //  обработчик удаления строки запроса
  const handleDeleteQuery = (id: string) => {
      //  прописать удаление запроса через глоб стор приложения (популярные запросы)
      // dispatch(deleteQuery(id))
  }
  return (
    <>
      <SearchInputUI value={value} placeholder="Поиск" onDeleteQuery={handleDeleteQuery} onChange={setValue} onClear={()=>setValue('')}/>
    </>
  );
};
