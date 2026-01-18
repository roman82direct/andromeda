import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Здесь будет главная страница</div>} />
      </Routes>
    </>
  );
}

export default App;
