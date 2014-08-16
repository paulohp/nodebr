var mongoose = require('mongoose');
var paginate = require('mongoose-paginate');
var jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  apply_to: {
    type: String,
    default: ''
  },
  karma: {
    type: Number,
    default: 0
  },
  company: {
    name: String,
    email: String,
    description: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

jobSchema.plugin(paginate);

module.exports = mongoose.model('jobs', jobSchema);
