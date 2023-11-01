class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item-login');
    const registerButton = document.querySelector('.menu-item-register');
    const logoutButton = document.querySelector('.menu-item-logout');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        const loginModal = App.getModal('login');
        if (loginModal) {
          loginModal.open();
        }
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        const registerModal = App.getModal('register');
        if (registerModal) {
          registerModal.open();
        }
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        User.logout((err, response) => {
          if (!err && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }

  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');

    if (sidebarToggle && body) {
      sidebarToggle.addEventListener('click', (event) => {
        event.preventDefault();
        body.classList.toggle('sidebar-open');
        body.classList.toggle('sidebar-collapse');
      });
    }
  }
}

Sidebar.init();
