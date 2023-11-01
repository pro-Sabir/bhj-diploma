class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Element is not defined.");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeButton = this.element.querySelector(".create-income-button");
    const createExpenseButton = this.element.querySelector(".create-expense-button");

    createIncomeButton.addEventListener("click", () => {
      const modal = App.getModal("new-income");
      if (modal) {
        modal.open();
      }
    });

    createExpenseButton.addEventListener("click", () => {
      const modal = App.getModal("new-expense");
      if (modal) {
        modal.open();
      }
    });
  }
}

