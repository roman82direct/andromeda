import { HomePage } from "@/pages/home-page";
import { PageLayout } from "@/pages/page-layout/page-layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* примерный план маршрутов */}
        <Route path="/" element={<PageLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="/catalog" element={<div>Основная страница товаров</div>} />
          <Route
            path="/catalog/:id"
            element={<div>Страница конкретного товара</div>}
          />
          {/*  профиль, корзина, избранное д б доступны тольок авторизованным пользователям и быть вложенны в защищенный маршрут */}
          <Route path="/favorite" element={<div>Избранное</div>} />
          <Route path="/cart" element={<div>Корзина</div>} />
          <Route path="/profile" element={<div>Профиль</div>} />

          <Route path="/register" element={<div>модалка на регистрацию</div>} />
          <Route path="/login" element={<div>модалка на вход</div>} />
          <Route path="/forgot-password" element={<div>Регистрация</div>} />
          <Route path="/reset-password" element={<div>Регистрация</div>} />

          <Route path="*" element={<div>404 - Страница не найдена</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
