/* jshint latedef: false */

// Ferramenta de população de dados para demonstração do sistema.
// Cada função representa um passo do populado, estando na ordem
// cronológica de ocorrência

var db = require(__dirname + '/../lib/db');
var faker = require('faker');

// Conecta no banco de dados
var conectar = function(){
  console.log('Conectando ao banco de dados...');
  if(db.connection.readyState !== 1)
    return db.connection.on('connected', function(){
      console.log('Banco de dados conectado');
      apagar();
    });

  console.log('Banco de dados conectado');
  apagar();
};

// Reseta o banco de dados
var apagar = function(){
  console.log('Resetando o banco de dados.');
  db.connection.db.dropDatabase(function(err){
    if(err)
      throw err;

    console.log('Banco de dados resetado.');
    news();
    jobs();
  });

};

// Cria 50 notícias
var news = function(){
  console.log('Criando notícias');
  var News = require(__dirname + '/../model/news-model');
  var collection = Array.apply(null, {length: 50}).map(function(){
    return {
      title: faker.lorem.sentence(),
      link: 'http://' + faker.internet.domainName(),
      description: faker.lorem.paragraphs(2),
      user: {
        name: faker.name.findName(),
        email: faker.internet.email()
      }
    };
  });

  (function loop(err){
    if(err)
      throw err;

    if(collection.length < 1){
      console.log('Notícias criadas');
      return finalizar();
    }

    var news = new News(collection.shift());
    news.save(loop);
  })();
};

// Cria 50 vagas ʕㅇ호ㅇʔ
var jobs = function(){
  console.log('Criando vagas');
  var Jobs = require(__dirname + '/../model/jobs-model');
  var collection = Array.apply(null, {length: 50}).map(function(){
    return {
      title: faker.lorem.sentence(),
      location: faker.address.city(),
      description: faker.lorem.paragraphs(3),
      occupation: faker.lorem.words(1),
      type: faker.lorem.words(1),
      apply_to: faker.internet.email(),
      company: {
        name: faker.company.companyName(),
        email: faker.internet.email(),
        description: faker.lorem.paragraphs(2),
      }
    };
  });

  (function loop(err){
    if(err)
      throw err;

    if(collection.length < 1){
      console.log('Vagas criadas');
      return finalizar();
    }

    var jobs = new Jobs(collection.shift());
    jobs.save(loop);
  })();
};



// Sai do processo
var finalizar = function(){
  console.log('Populate finalizado');
  process.exit(0);
};


// Iniciando a cadeia de funções
conectar();
