import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Здесь будет главная страница</div>} />
        <Route path='/catalog-main' element={<div>Основная страница товаров</div>}/>
        <Route path='/login' element={<div>Страница входа на сайт</div>}/>
        {/*  профиль, корзина, избранное д б доступны тольок авторизованным пользователям и быть вложенны в защищенный маршрут */}
        <Route path='/favorite' element={<div>Избранное</div>}/>
        <Route path='/cart' element={<div>Корзина</div>}/>
        <Route path='/profile'element={<div>Профиль</div>}/>
      </Routes>
    </>
  );
}

export default App;
