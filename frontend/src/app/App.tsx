import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* примерный план маршрутов */}
        <Route path="/" element={<div>Здесь будет главная страница</div>} />
        <Route path="/catalog" element={<div>Основная страница товаров</div>} />
        <Route
          path="/catalog/:id"
          element={<div>Страница конкретного товара</div>}
        />
        {/*  профиль, корзина, избранное д б доступны тольок авторизованным пользователям и быть вложенны в защищенный маршрут */}
        <Route path="/favorite" element={<div>Избранное</div>} />
        <Route path="/cart" element={<div>Корзина</div>} />
        <Route path="/profile" element={<div>Профиль</div>} />

        <Route path="/register" element={<div>Регистрация</div>} />
        <Route path="/login" element={<div>Страница входа на сайт</div>} />
        <Route path="/forgot-password" element={<div>Регистрация</div>} />
        <Route path="/reset-password" element={<div>Регистрация</div>} />

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </>
  );
}

export default App;
