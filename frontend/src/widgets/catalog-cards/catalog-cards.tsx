import { CatalogCardsUI } from "./ui/catalog-cards";
import {catalogCards} from './model/catalogCards/catalogCards';

// разберись с заголовками  страницы домашней !!!!
//  пути для assets !!!!! где оно вообще д б?

export const CatalogCards = ()=>{


  return <div>
        <CatalogCardsUI cards={catalogCards}/>
    </div>
}