class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (!err && response.success) {
        this.reset();
        App.setState('user-logged');
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalInstance = Modal.getModal(modal.id);
          if (modalInstance) {
            modalInstance.close();
          }
        }
      }
    });
  }
}
