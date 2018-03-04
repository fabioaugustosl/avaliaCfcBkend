var alunosController = function(alunoModel){


	var salvarNovo = function(req, res){
		var aluno = new alunoModel(req.body);

		var msgObrigatorio = '';

		if(!aluno.nome){
			msgObrigatorio += 'Nome é obrigatório.<br/>';
		} 
		if(!aluno.cfc){
			msgObrigatorio += 'CFC obrigatório.<br/>';
		}
		
		if(msgObrigatorio != '') {
			res.status(400);
			res.send(msgObrigatorio);
		} else {

			if(!aluno.login){
				aluno.login = Math.floor(Math.random() * (999999 - 0) + 0); // gera um numero aleatório de 6 digitos
			}

			aluno.save();
			res.status(201);
			res.send(aluno);	
		}
		
	};

	
	var remover = function(req, res){
		req.aluno.remove(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(204).send('Aluno removido.');
			}
		});
	};

	var substituir = function(req, res){
		req.aluno.nome = req.body.nome;
		req.aluno.login = req.body.login;
		req.aluno.email = req.body.email;
		req.aluno.celular = req.body.celular;
		req.aluno.senha = req.body.senha;

		validarObrigatoriedade(req.aluno, res);

		req.aluno.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.aluno);
			}
		});
	};

	var atualizar = function(req, res){
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body){
			req.aluno[p] = req.body[p];	
		}
		
		req.aluno.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.aluno);
			}
		});
	};

	var listar = function(req, res){
		var query = {};
		if(req.query){
			query = req.query;
		}
		alunoModel.find(query, function(err, alunos){
			if(err){
				res.status(500).send(err);
			} else {

				var returnAlunos = [];
				alunos.forEach(function(element, index, array){
					var alunoObj = element.toJSON();
					alunoObj.links = {};
					alunoObj.links.self = 'http://'+req.headers.host + '/api/alunos/v1/' + alunoObj._id;
					returnAlunos.push(alunoObj);
				});

				res.json(returnAlunos);
			}
		});
	};

	return {
		substituir : substituir,
		atualizar : atualizar,
		remover : remover,
		listar : listar,
		salvarNovo : salvarNovo
	};

};

module.exports = alunosController;