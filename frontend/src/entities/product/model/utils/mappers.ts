import type { ProductDTO, ProductImageDTO } from "../../api/types";
import type { IImageProduct, IProduct } from "../types";
// пишем адаптер
export const convertDTOtoIProduct = (dtoProduct: ProductDTO): IProduct => {
  return {
    id: dtoProduct.id,
    articul: dtoProduct.articul,
    title: dtoProduct.title,
    description: dtoProduct.description,
    price: Number(dtoProduct.price), // в отличие от DTO берем number вместо string
    isPublished: dtoProduct.is_published,
    collection: dtoProduct.collection,
    brand: dtoProduct.brand,
    secondCategory: dtoProduct.second_category,
    images: convertDTOProdImages(dtoProduct.images),
    createdAt: new Date(dtoProduct.created_at), // ISO дата перевели в удобный формат
    updateAt: new Date(dtoProduct.update_at),
  };
};

export const convertDTOProdImages = (
  images: ProductImageDTO[],
): IImageProduct[] => {
  return images.map((imageObj) => ({
    imgUrl: imageObj.img_url,
    isMain: imageObj.is_main,
    isPack: imageObj.is_pack,
  }));
};
