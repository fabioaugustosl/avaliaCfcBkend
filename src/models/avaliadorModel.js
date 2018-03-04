var mongoose = require('mongoose'), Schema = mongoose.Schema;

var avaliadorModel = new Schema({
	id : {type : String },
	nome : {type : String},
	email : {type : String},
	senha : {type : String},
	celular : {type : String},
	cfc : {type : String}
});

module.exports = mongoose.model('Avaliador', avaliadorModel);
