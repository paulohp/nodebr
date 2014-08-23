// Rota responsável por distribuir o HTML
var server  = require(__dirname + '/../lib/http');

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: 'index'
  }
});

server.route({
  method: 'GET',
  path: '/noticias',
  handler: {
    view: 'news'
  }
});

server.route({
  method: 'GET',
  path: '/vagas',
  handler: {
    view: 'jobs'
  }
});

server.route({
  method: 'GET',
  path: '/vagas/{slug}',
  handler: {
    view: 'jobs_show'
  }
});
