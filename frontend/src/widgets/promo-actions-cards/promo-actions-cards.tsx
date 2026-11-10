import { PromoActionsCardsUI } from "./ui/promo-actions-cards";
import { promoActions } from "./model/promoActions/promoActions";

// разберись с заголовками  страницы домашней !!!!
//  пути для assets !!!!! где оно вообще д б?

export const PromoActionsCards = () => {
  return (
    <div>
      <PromoActionsCardsUI cards={promoActions} />
    </div>
  );
};
