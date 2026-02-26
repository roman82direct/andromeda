import type { TAccessToken, TRequestTokens, TResponseTokens } from "./types";
import { API_URL } from "../config/api";

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok
    ? res.json()
    : res
        .json()
        .then((err) => Promise.reject({ ...err, statusCode: err.status }));

//  для запросов которые портребуют acess токен(когда хотим получить защищенные данные)
export const request = async <T>(
  endoint: RequestInfo,
  options: RequestInit,
) => {
  try {
    const res = await fetch(`${API_URL}/${endoint}`, {
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      ...options,
    });
    return await checkResponse<T>(res);
  } catch (error) {
    // если access токен протух, вернем ошибку
    return Promise.reject(error);
  }
};

// получаем токены access и refresh исрользуя OTP код и номер телефона
export const getTokensApi = (parametrs: TRequestTokens) => {
  return fetch(`${API_URL}/auth/verify-code/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(parametrs),
  })
    .then((res) => checkResponse<TResponseTokens>(res))
    .then((data) => {
      if (data?.access && data?.refresh) return data;
      return Promise.reject(data);
    });
};
// Обновление access-токена через рефреш

export const getAccessTokenByRefresh = () => {
  // получаем рефреш токен ?? подумать где его хранить возможно http only cookie
  const refreshToken = localStorage.getItem("refresh"); //Антипатерн!!!! => min http only cookie
  return fetch(`${API_URL}/auth/token-refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(refreshToken),
  })
    .then((res) => checkResponse<TAccessToken>(res))
    .then((data) => {
      if (data?.access) return data;
      return Promise.reject(data);
    });
};

//  алгоритм если получаем ошибку  401 или 404

export const fetchWithRefresh = async <T>(
  endoint: RequestInfo,
  options: RequestInit,
) => {
  try {
    //  делаем запрос с авториз токеном
    const result = await request<T>(endoint, options);
    return result;
  } catch (error) {
    //  если получили ошибку при попытке авторизации
    if (error && typeof error === "object" && "statusCode" in error) {
      // const err = error as {statusCode: number | string}
      if (error.statusCode === 401 || error.statusCode === 403) {
        const refreshData = await getAccessTokenByRefresh();
        // если access не появился => выполним отклонение промиса
        if (!refreshData.access) {
          return Promise.reject(refreshData); // => если обновить не удалось , отклоняем ,чтобы перевести пользователч на логин
        }
        // переделать!!!
        localStorage.setItem("acessToken", refreshData.access);
        //  проверяем авторизацию с новым acess токеном
        return request<T>(endoint, {
          ...options,
          headers: {
            ...options.headers,
            authorization: localStorage.getItem("acessToken") as string,
          },
        });
      }
    }
  }
};

// httpOnly: true,    // Запрещает доступ к куке через document.cookie (защита от XSS)
//   secure: true,      // Кука передается только по HTTPS (обязательно для продакшена)
//   sameSite: 'lax', // Защита от CSRF-атак
