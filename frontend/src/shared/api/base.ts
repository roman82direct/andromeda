//  обработка ошибки промиса
// export const checkResponse = <T>(res: Response): Promise<T> =>
//   res.ok ? res.json() : res.json().then((err) => Promise.reject(err));


export const checkResponse = async <T>(res: Response): Promise<T> => {
  try {
    // Пытаемся распарсить тело ответа как JSON
    const data =  await res.json();
    if(!res.ok) {
        return Promise.reject(data) // если статус не 200 - возвращает эту ошибку
    }
    return data
  } catch (err) {
    //  если JSON не удалось распарсить - напр сервер вернул некорректный json или рустое тело ответа
    // нам нужен гарантированный объект ошибки
    return Promise.reject({
      messages:'unknown Error from Server',
      originalError: err
    })
  }
}