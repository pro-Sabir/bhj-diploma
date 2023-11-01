const createRequest = (options = {}) => {
    const { url, data, method, callback } = options;
  
    // Создаем объект XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // Открываем соединение
    xhr.open(method, url);
  
    // Устанавливаем тип ответа
    xhr.responseType = 'json';
  
    // Устанавливаем обработчик события загрузки
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Если статус запроса успешный, передаем данные в callback
        callback(null, xhr.response);
      } else {
        // В случае ошибки, передаем объект ошибки в callback
        callback(new Error(`Request failed with status ${xhr.status}`), null);
      }
    });
  
    // Устанавливаем обработчик события ошибки
    xhr.addEventListener('error', () => {
      // В случае ошибки сети, передаем объект ошибки в callback
      callback(new Error('Network error'), null);
    });
  
    // Проверяем метод запроса и отправляем данные соответствующим образом
    if (method === 'GET') {
      xhr.send();
    } else {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      xhr.send(formData);
    }
  };
  
  // Пример использования
  createRequest({
    url: 'https://example.com',
    data: {
      email: 'ivan@poselok.ru',
      password: 'odinodin'
    },
    method: 'GET',
    callback: (err, response) => {
      if (err) {
        console.log('Ошибка, если есть', err);
      } else {
        console.log('Данные, если нет ошибки', response);
      }
    }
  });
  