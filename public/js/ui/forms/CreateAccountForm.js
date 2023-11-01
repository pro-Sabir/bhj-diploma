class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (!err && response.success) {
        this.element.reset();
        const modal = App.getModal("new-account");
        if (modal) {
          modal.close();
        }
        App.update();
      }
    });
  }
}
