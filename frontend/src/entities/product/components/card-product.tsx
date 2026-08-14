import { Link } from "react-router-dom";
import { CardProductUI } from "./ui/card-product/card-product";
import type { TCardProduct } from "../model/types";

export type CardProductProps = {
  path?: string;
} & TCardProduct;

export const CardProduct = (cardDataProd: CardProductProps) => {

  //  подумать как настроить ссылкуперехода
  // по id или articul ????
    const {id, path, ...otherDataCardProd} = cardDataProd;
    // const { id } = otherDataCardProd;
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
      <CardProductUI {...otherDataCardProd} onClick={handleAddToFavoriteProducts} />
    </Link>
  );
};
