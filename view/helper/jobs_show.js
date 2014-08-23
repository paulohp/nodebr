var Jobs = require(__dirname + '/../../model/jobs-model');
var moment = require('moment');

module.exports = function(chunk, context, bodies){
  return chunk.map(function(chunk){

    // Verificamos o slug dá página para buscar a vaga
    var param = context.stack.head.params;
    var slug = param.slug;

    // Fazemos a busca na collection jobs em busca da vaga.
    Jobs.findOne({'slug': slug}, function(err, job){
      if(err) throw err;

      moment.locale('pt-BR');
      var created = moment(job.created).format('LLLL');

      // Renderizamos o job.
      chunk.render(bodies.block, context.push({
        job : job,
        date: created,
      }));

      // Avisamos para o dust.js que o nosso trabalho aqui terminou
      chunk.end();
    });
  });
};
