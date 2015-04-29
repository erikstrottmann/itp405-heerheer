module.exports.routes = {

  // HTML Views
  '/': { view: 'homepage' },
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup' },
  '/welcome': { view: 'user/welcome' },
  '/events': 'EventController.list',
  '/events/create': { view: 'event/create' },

  // Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',

  'post /events': 'EventController.create'
};
