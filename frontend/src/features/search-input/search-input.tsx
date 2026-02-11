import { useEffect, useState, type FC } from "react";
import { SearchInputUI } from "./ui/search-input";

export const SearchInput: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // нужно ли здесь коллбэк ?
  // const dispatch = useDispatch();
  //  нужен ли сабмит формы? = > как то связть его со стором или Api думать?
  useEffect(() => {
    // сохранение значение поиска в стор? подумать
    // допустим
    // dispatch(setSearchInput(value));
  }, [searchQuery]);
  //  здесь можно взять из стора - популярные запросы и историю и кинуть в UI
  // простой алгоритм поиска в базе
  // goods - получаем из стора
  // const filtered = goods.filter((name)=> name.includes(searchQuery))
  //  значение поиска меняет состояние данных которые покажет вью? передаем в вью  =>
  //  обработчик удаления строки запроса
  const handleDeleteQuery = (id: string) => {
    //  прописать удаление запроса через глоб стор приложения (популярные запросы)
    // dispatch(deleteQuery(id))
  };
  return (
    <>
      <SearchInputUI
        value={searchQuery}
        placeholder="Поиск"
        onDeleteQuery={handleDeleteQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
      />
    </>
  );
};
