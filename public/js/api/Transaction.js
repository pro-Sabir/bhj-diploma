class Transaction extends Entity {
    static URL = '/transaction';
  }
  
  // Пример использования
  const data = {
    /* данные для создания транзакции */
  };
  
  Transaction.create(data, function (err, response) {
    if (err) {
      console.log('Ошибка, если есть', err);
    } else {
      console.log('Данные созданной транзакции', response);
    }
  });
  
