//  сделать рефакторинг типов ??
// запрос на получение кода телефона
export type TdataPhone = {
  phone: string;
};
// сообщение об успешном выходе из аккаунта
export type TSuccessLogOut = TdataPhone & TDetailError;
//  детали ошибки запроса
export type TDetailError = {
  detail: string;
};
//  ответ при отправке телефона
//  положительный ответ
export type TWrongMessages = string[];
// ответ на запрос кода
export type TResponseCodeWithPhone = {
  phone: string | TWrongMessages;
  code?: string; // если номер введен неверно или не введен вообще  код не появится
};

//  ошибочное введенные данные
export type TWrongCode = {
  // код веден неверно - сделаем mapper ?
  non_field_errors: TWrongMessages;
};

export type TWrongPhone = {
  // телефон введен неверно
  phone: TWrongMessages;
};

//  ошибка обновления токена
export type TWrongRefreshToken = {
  code: string;
} & TDetailError;
