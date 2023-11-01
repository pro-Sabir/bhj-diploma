class Account extends Entity {
  static URL = '/account';

  static get(id = '', callback) {
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}

// Пример использования
Account.get(2, function (err, response) {
  if (err) {
    console.log('Ошибка, если есть', err);
  } else {
    console.log('Данные счета', response);
  }
});
