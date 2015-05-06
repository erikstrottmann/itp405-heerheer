module.exports.routes = {

  // Authentication
  'get /': { view: 'homepage' },
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup' },

  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',

  'get /welcome': { view: 'user/welcome' },

  // User details
  // 'get /users/:id': 'UserController.details',

  // Events
  'get /events': 'EventController.list',
  'post /events': 'EventController.create',

  'get /events/create': { view: 'event/create' },

  'get /events/:id': 'EventController.details',
  // 'post /events/:id/attendees': 'EventController.checkIn',
};
