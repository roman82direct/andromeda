// запрос токенов
export type TRequestTokens = {
  phone: string;
  code: string;
};
//  ответ на запрос токенов
export type TResponseTokens = {
  // положительный ответ
  phone: string;
  access: string;
  refresh: string;
};

//  обновление access токена

export type TRefrToken = {
  refresh: string;
};

export type TAccessToken = {
  access: string;
};
