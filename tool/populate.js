/* jshint latedef: false */

// Ferramenta de população de dados para demonstração do sistema.
// Cada função representa um passo do populado, estando na ordem
// cronológica de ocorrência

var db = require(__dirname + '/../lib/db');
var faker = require('Faker');

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
      title: faker.Lorem.sentence(),
      link: 'http://' + faker.Internet.domainName(),
      description: faker.Lorem.paragraphs(2),
      user: {
        name: faker.Name.findName(),
        email: faker.Internet.email()
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
      title: faker.Lorem.sentence(),
      location: faker.Address.city(),
      description: faker.Lorem.paragraphs(3),
      occupation: faker.Lorem.words(1),
      type: faker.Lorem.words(1),
      apply_to: faker.Internet.email(),
      company: {
        name: faker.Company.companyName(),
        email: faker.Internet.email(),
        description: faker.Lorem.paragraphs(2),
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
