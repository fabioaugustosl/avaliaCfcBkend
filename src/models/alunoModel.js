var mongoose = require('mongoose'), Schema = mongoose.Schema;

var alunoModel = new Schema({
	id : {type : String },
	nome : {type : String},
	cfc : {type : String},
	login : {type : String},
	senha : {type : String},
	email : {type : String},
	categoria : {type : String},
	celular : {type : String},
	dataExame: [{ type: Date }],
	dataAprovacao: { type: Date }
});

module.exports = mongoose.model('Aluno', alunoModel);
