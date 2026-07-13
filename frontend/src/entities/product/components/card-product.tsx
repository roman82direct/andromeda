import { Link } from "react-router-dom";
import { CardProductUI } from "./ui/card-product/card-product";

export type CardProductProps = {
  id?: string;
  path?: string;
};

export const CardProduct = ({
  id = "1",
  path = "catalog",
}: CardProductProps) => {
  // {id}:CardProductProps
  // получаем данные карточки по id => сделать!
  //  пока загушка
  //  продумать - может это вообще монжо получать через пропсы
  const dataCard = {
    price: 100,
    oldPrice: 99,
    productName: "стул",
    reviewsNum: 500,
    rating: "5.0",
    isFavorite: false,
    isNew: true,
  };

  //   const handleLike = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // Вызов вашей функции добавления в избранное    = > вешаем на иконку лайка
  // };

  const handleAddToFavoriteProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // дописать - используя глоб стор
  };

  // возможность перехода
  return (
    <Link to={`/${path}/${id}`}>
      <CardProductUI {...dataCard} onClick={handleAddToFavoriteProducts} />
    </Link>
  );
};
