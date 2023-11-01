class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  async renderAccountsList() {
    try {
      const accountsList = await Account.list();
      const selectElement = this.element.querySelector('select.accounts-select');

      selectElement.innerHTML = '';

      for (const account of accountsList) {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        selectElement.appendChild(option);
      }
    } catch (error) {
      console.error('Error rendering accounts list:', error);
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  async onSubmit(data) {
    try {
      await Transaction.create(data);
      this.element.reset();
      const modal = this.element.closest('.modal');
      if (modal) {
        const modalInstance = Modal.getModal(modal.dataset.modalId);
        if (modalInstance) {
          modalInstance.close();
        }
      }
      App.update();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }
}
