var http = require('http')
var fs = require('fs')

http.createServer(function(req, res){
	console.log(req.method + " " + req.url)

	if(req.url.match(/\/arqs\/(([1-9][0-9]?)|(1[0-1][0-9])|(12[0-2]))$/)){
		var num = req.url.split("/")[2]

		fs.readFile('site/arq' + num + '.html', function(err, data) {

            if(!err){
			    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			    res.write(data)                
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
                res.write('Documento não encontrado.')
            }
            res.end()
		})
	}
	else if(req.url.match(/\/arqs\/\*$/)){
		

		fs.readFile('site/index.html', function(err, data) {

            if(!err){
			    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			    res.write(data)                
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
                res.write('Documento não encontrado.')
            }
            res.end()
		})
	}

	else{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write("<p>O URL não corresponde ao esperado.</p>")
		res.end()
	}
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')