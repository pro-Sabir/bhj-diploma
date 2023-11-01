class Entity {
  static URL = '';

  static list(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'GET',
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'PUT',
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'DELETE',
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}

// Пример использования
const data = {
  mail: 'ivan@biz.pro',
  password: 'odinodin'
};

Entity.list(data, function (err, response) {
  if (err) {
    console.log('Ошибка, если есть', err);
  } else {
    console.log('Данные, если нет ошибки', response);
  }
});
