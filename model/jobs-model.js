var mongoose = require('mongoose');
var paginate = require('mongoose-paginate');
var slug = require('slug');
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
  slug: {
    type: String,
    unique: true,
    index: true
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

jobSchema.pre('save', function(next){
  var ndate = new Date(this.created);
  this.slug = slug(this.title+ndate.getTime());
  next();
});

jobSchema.plugin(paginate);

module.exports = mongoose.model('jobs', jobSchema);
