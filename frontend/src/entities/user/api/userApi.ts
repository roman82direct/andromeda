// import { checkResponse } from "@/shared/api/base";
// import type { TdataPhone, TRequestTokens, TRefrToken, TAccessToken, TResponseCodeWithPhone, TResponseTokens, TSuccessLogOut } from "./types";
// import { API_URL } from "@/shared/config/api";

// // 1 шаг - получить код OTP по номеру телефона
// export const getCodeOTPByPhoneApi = (dataPhone: TdataPhone) => {
//   return fetch(`${API_URL}/auth/send-code/`,{
//     method: 'POST',
//     headers: {
//       "Content-Type:" : "application/json;charset=utf-8"
//     },
//     body: JSON.stringify(dataPhone)
//   })
//     .then((res)=>checkResponse<TResponseCodeWithPhone>(res)) // проверяем что статус 200 если нет отклоняем
//     .then((data)=>{
//        if(data?.code) return data; // если код  есть возвр промис resolve
//        return Promise.reject(data) // если кода  нет значит , считаем результат неуспешным  напр- неккорекный ввод номера телефона
//       //  и отклоняем промис чтобы позже обработать в блоке catch как ошибку
//     })
// }

// //  2 шаг - получаем токены access и refresh исрользуя OTP код и номер телефона
// export const getTokensApi = (parametrs:TRequestTokens) =>{
//   return fetch(`${API_URL}/auth/verify-code/`, {
//     method:'POST',
//     headers: {
//       "Content-Type":"application/json;charset=utf-8"
//     },
//     body: JSON.stringify(parametrs)
//   })
//     .then((res)=>checkResponse<TResponseTokens>(res))
//     .then((data)=> {
//       if(data?.access && data?.refresh) return data;
//       return Promise.reject(data)
//     })
// }
// // 3 Обновление access-токена

// export const getAccessTokenByRefresh = (dataRefresh:TRefrToken) => {
//   return fetch(`${API_URL}/auth/token-refresh`, {
//     method: 'POST',
//     headers: {
//       "Content-Type":"application/json;charset=utf-8" 
//     },
//     body: JSON.stringify(dataRefresh)
//   })
//     .then((res)=>checkResponse<TAccessToken>(res))
//     .then((data)=>{
//       if(data?.access) return data;
//       return Promise.reject(data)
//     })
// }
// //  подумать где лучше извлевать токен
// export const logoutApi = (accessToken: string)=>{
//   return fetch(`${API_URL}/auth/logout/`,{
//     method: 'POST',
//     headers: {
//       "Content-Type":"application/json;charset=utf-8",
//       authorization:`Bearer ${accessToken}`
//     },
//   }).then((res)=>checkResponse<TSuccessLogOut>(res))
//     .then((data)=>{
//       // проверить!
//       if(data?.phone && data?.detail) return data
//       return Promise.reject(data);
//     })
// }


