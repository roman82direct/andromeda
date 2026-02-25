import { checkResponse } from "@/shared/api/base";
import type {
  TdataPhone,
  TResponseCodeWithPhone,
  TSuccessLogOut,
} from "./types";
import { API_URL } from "@/shared/config/api";

// 1 шаг - получить код OTP по номеру телефона
export const getCodeOTPByPhoneApi = (dataPhone: TdataPhone) => {
  return fetch(`${API_URL}/auth/send-code/`, {
    method: "POST",
    headers: {
      "Content-Type:": "application/json;charset=utf-8",
    },
    body: JSON.stringify(dataPhone),
  })
    .then((res) => checkResponse<TResponseCodeWithPhone>(res)) // проверяем что статус 200 если нет отклоняем
    .then((data) => {
      if (data?.code) return data; // если код  есть возвр промис resolve
      return Promise.reject(data); // если кода  нет значит , считаем результат неуспешным  напр- неккорекный ввод номера телефона
      //  и отклоняем промис чтобы позже обработать в блоке catch как ошибку
    });
};



//  подумать где лучше извлевать токен
//  перенеси в пользователя
export const logoutApi = (accessToken: string) => {
  return fetch(`${API_URL}/auth/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => checkResponse<TSuccessLogOut>(res))
    .then((data) => {
      if (data?.phone && data?.detail) return data;
      return Promise.reject(data);
    });
};





