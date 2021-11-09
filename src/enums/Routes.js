class Routes {
  constructor() {
    this.home = '/';
    this.detail = '/detail/:id';
    this.pure = {
      detail: '/detail/',
    };
  }
}

export default new Routes();
