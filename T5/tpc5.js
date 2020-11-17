var http = require('http')
var axios = require('axios')

http.createServer(function(req, res){
	console.log(req.method + ' ' + req.url)
	
	if(req.method=='GET'){
		if(req.url == '/'){//esta na pagina principal e é necessário fazer o render			

			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write('<h2> Escola de Música</h2>')
			res.write('<ul>') //indice de operações -ul
			res.write('<li><a href="/alunos">Lista de alunos</a></li>')
			res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
			res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
			res.write('</ul>')
			res.end()
		} 
		else if(req.url == '/alunos'){//lista dos ids alunos
			axios.get('http://localhost:3000/alunos') //3000 pq é a api de dados
			
			.then(function(resp) {
				alunos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
				res.write('<h2> Escola de Música:Lista de Alunos</h2>')
				res.write('<ul>') //indice de operações -ul
				
				alunos.forEach(a => {
					res.write(`<li><a href="http://localhost:4000/alunos/${a.id}">${a.id}</a></li>`)//ids dos alunos
				
				});

				res.write('</ul>')
				res.write('<address>[<a href="/">Voltar</a>]</adress>') //voltar à pagina inicial
				res.end()

			}).catch(function(error) {
				console.log('Erro na Obtenção da lista de alunos:' + error);	
			});
		}

		else if(req.url.match(/\/alunos\/[AE]+[0-9]+/)){//informação individual de cada aluno
			axios.get('http://localhost:3000' + req.url)
			
			.then(function(resp) {

				alunos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
				res.write('<ul>');
            			res.write('<h2> Dados dos Alunos</h2>');
            			res.write('<p>Id :' + alunos.id + '</p>');
            			res.write('<p>Nome : ' + alunos.nome + '</p>');
            			res.write('<p>Data de Nascimento : ' + alunos.dataNasc + '</p>');
            			res.write(`<p>Curso : <a href="http://localhost:4000/cursos/${alunos.curso}">${alunos.curso}</a></p>`);
            			res.write('<p>Ano do Curso  : ' + alunos.anoCurso + '</p>');
            			res.write('<p>Instrumento  : ' + alunos.instrumento + '</p>');
            			res.write(`<p><a href="http://localhost:4000/alunos">Voltar à lista alunos</a></p>`)
            			res.write('</ul>');
            			res.end();

			}).catch(function(error) {
            			console.log('Erro :'+ error);
            			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            			res.write('<p>Aluno inexistente</p>');
            			res.write(`<p><a href="http://localhost:4000/alunos">Voltar à lista alunos</a></p>`)
            			res.end();
        		});
		}

		else if(req.url == '/cursos'){//lista dos ids dos cursos
			axios.get('http://localhost:3000/cursos')

			.then(function(resp) {
				cursos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
				res.write('<h2> Escola de Música:Lista de Cursos</h2>')
				res.write('<ul>') 
				
				cursos.forEach(c => {
					res.write(`<li><a href="http://localhost:4000/cursos/${c.id}">${c.id}</a> </li>`)//ids dos cursos
				
				});

				res.write('</ul>')
				res.write('<address>[<a href="/">Voltar</a>]</adress>') 
				res.end()

			}).catch(function(error) {
				console.log('Erro na Obtenção da lista de cursos:' + error);	
			});
		}

		else if(req.url.match(/\/cursos\/[CBS]+[0-9]+/)){//informação individual de cada curso
			axios.get('http://localhost:3000' + req.url)

    			.then(function(resp) {
				cursos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})	
            			cursos = resp.data;
            			res.write('<ul>');
            			res.write('<h2> Dados do Curso:</h2>');
            			res.write('<p>Id :' + cursos.id + '</p>');
            			res.write('<p>Designação : ' + cursos.designacao + '</p>');
            			res.write('<p>Duração : ' + cursos.duracao + '</p>');
            			res.write(`<p>Instrumento : <a href="http://localhost:4000/instrumentos/${cursos.instrumento.id}">${cursos.instrumento.id}</a></p>`);
            			res.write(`<p><a href="http://localhost:4000/cursos">Voltar à lista de cursos</a></p>`);
            			res.write('</ul>');
            			res.end();
        		}).catch(function(error) {
            			console.log('Erro :'+ error);
            			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            			res.write('<p>Curso inexistente</p>');
            			res.write(`<p><a href="http://localhost:4000/cursos">Voltar à lista de cursos</a></p>`);
            			res.end();
        		});
		}

		else if(req.url == '/instrumentos'){//lista dos ids dos instrumentos
			axios.get('http://localhost:3000/instrumentos')

			.then(function(resp) {
				instrumentos = resp.data;
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
				res.write('<h2> Escola de Música:Lista de Instrumentos</h2>')
				res.write('<ul>')
				
				instrumentos.forEach(i => {
					res.write(`<li><a href="http://localhost:4000/instrumentos/${i.id}">${i.id}</a></li>`)//ids dos instrumentos
				
				});

				res.write('</ul>')
				res.write('<address>[<a href="/">Voltar</a>]</adress>')
				res.end()

			}).catch(function(error) {
				console.log('Erro na Obtenção da lista de instrumentos:' + error);	
			});
		}
		else if(req.url.match(/\/instrumentos\/[A-za-z ]+/)){//informação individual de cada instrumento
			axios.get('http://localhost:3000' + req.url)

			.then(function(resp){
				instrumentos = resp.data;
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
				res.write('<ul>');
            			res.write('<h2> Dados do Instrumento:</h2>');
            			res.write('<p>Id :' + instrumentos.id + '</p>');
            			res.write('<p>Designação : ' + instrumentos["#text"] + '</p>');
            			res.write(`<p><a href="http://localhost:4000/instrumentos">Voltar à lista de instrumentos</a></p>`);
            			res.write('</ul>');
            			res.end();
        		}).catch(function(error) {
            			console.log('Erro :'+ error);
            			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            			res.write('<p>Instrumento inexistente</p>');
            			res.write(`<p><a href="http://localhost:4000/instrumentos">Voltar à lista de instrumentos</a></p>`);
            			res.end();
        		});

		}
		else{ //caso não seja um get dá isto 
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write("<p>Pedido Não Suportado: " + req.method + " " + req.url +"</p>")
			res.end()
		}	
	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write("<p>Pedido Não Suportado: " + req.method + " " + req.url +"</p>")
		res.end()
	}

}).listen(4000)

console.log('Servidor à escuta na porta 4000...')
