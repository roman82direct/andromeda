//  сущности продукта получаемые с сервера необходимо адаптировать под наше приложение
export interface ProductDTO {
  id: number;
  articul: string;
  title: string;
  description: string;
  price: string; // !!!сервер присылает строку!
  is_published: boolean;
  collection: CollectionDTO;
  brand: BrandDTO;
  second_category: string;
  images: ProductImageDTO[];
  created_at: string; // ISO дата
  update_at: string; // ISO дата
}

export interface CollectionDTO {
  title: string;
  description: string;
}

export interface BrandDTO {
  title: string;
  description: string;
}

export interface ProductImageDTO {
  img_url: string;
  is_main: boolean;
  is_pack: boolean;
}
