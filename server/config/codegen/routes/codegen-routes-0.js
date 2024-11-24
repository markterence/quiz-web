module.exports = {
  // Route for Answers
  'GET /answers': 'answers/find',
  'GET /answers/:id': 'answers/findOne',
  'POST /answers': 'answers/create',
  'PUT /answers/:id': 'answers/update',
  'DELETE /answers/:id': 'answers/destroy',

  // Route for Questions
  'GET /questions': 'questions/find',
  'GET /questions/:id': 'questions/findOne',
  'POST /questions': 'questions/create',
  'PUT /questions/:id': 'questions/update',
  'DELETE /questions/:id': 'questions/destroy',

  // Route for Takers
  'GET /takers': 'takers/find',
  'GET /takers/:id': 'takers/findOne',
  'POST /takers': 'takers/create',
  'PUT /takers/:id': 'takers/update',
  'DELETE /takers/:id': 'takers/destroy',

  // Route for Admins
  'GET /admins': 'admins/find',
  'GET /admins/:id': 'admins/findOne',
  'POST /admins': 'admins/create',
  'PUT /admins/:id': 'admins/update',
  'DELETE /admins/:id': 'admins/destroy',
};
