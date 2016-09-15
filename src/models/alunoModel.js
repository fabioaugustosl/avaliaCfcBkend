var mongoose = require('mongoose'), Schema = mongoose.Schema;

var alunoModel = new Schema({
	id : {type : Number },
	nome : {type : String},
	email : {type : String},
	celular : {type : String}
});

module.exports = mongoose.model('Aluno', alunoModel);