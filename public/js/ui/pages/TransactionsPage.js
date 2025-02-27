class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Element is required.');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update(options) {
    if (options && options.account_id) {
      this.render(options);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользоваться
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', async (event) => {
      if (event.target.classList.contains('remove-account')) {
        const confirmed = confirm('Вы действительно хотите удалить счёт?');
        if (confirmed) {
          this.removeAccount();
        }
      } else if (event.target.classList.contains('transaction__remove')) {
        const transactionId = event.target.getAttribute('data-id');
        const confirmed = confirm('Вы действительно хотите удалить эту транзакцию?');
        if (confirmed) {
          this.removeTransaction(transactionId);
        }
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызвать
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновить только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  async removeAccount() {
    const confirmed = confirm('Вы действительно хотите удалить счёт?');
    if (confirmed) {
      try {
        await Account.remove(this.lastOptions.account_id);
        this.clear();
        App.updateWidgets();
        App.updateForms();
      } catch (error) {
        console.error('Error removing account:', error);
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызвать метод App.update(),
   * либо обновить текущую страницу (метод update) и виджет со счетами
   * */
  async removeTransaction(id) {
    const confirmed = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (confirmed) {
      try {
        await Transaction.remove(id);
        this.update(this.lastOptions);
      } catch (error) {
        console.error('Error removing transaction:', error);
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  async render(options) {
    if (options && options.account_id) {
      this.clear();
      try {
        const account = await Account.get(options.account_id);
        this.renderTitle(account.name);
        const transactions = await Transaction.list({ account_id: options.account_id });
        this.renderTransactions(transactions);
      } catch (error) {
        console.error('Error rendering transactions page:', error);
      }
      this.lastOptions = options;
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTitle('Название счёта');
    this.renderTransactions([]);
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    if (titleElement) {
      titleElement.textContent = name;
    }
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const typeClass = item.type.toLowerCase() === 'income' ? 'transaction_income' : 'transaction_expense';
    const date = this.formatDate(item.created_at);
    return `
      <div class="transaction ${typeClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const contentElement = this.element.querySelector('.content');
    if (contentElement) {
      contentElement.innerHTML = data.map(item => this.getTransactionHTML(item)).join('');
    }
  }
}
