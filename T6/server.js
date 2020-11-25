var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static')
var { parse } = require('querystring')
const { fileURLToPath } = require('url')


// Funções auxilidares
function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

// Template para a página com to do List ------------------
function geraPagList(lista) {
    let pagHTML = `
        <div class="w3-container w3-teal">
            <h2>ToDo List</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Início</th>
                <th>Fim</th>
                <th>Responsável</th>
                <th>Descrição</th>
                <th>Estado</th>
                <th></th>
                <th></th>
            </tr>
    `
    lista.forEach(a => {
        switch (a.estado) {
            case "0":
                pagHTML += `
                <tr>
                    <td>${a.dregisto}</td>
                    <td>${a.dtermino}</td>
                    <td>${a.nome}</td>
                    <td>${a.descriTarefa}</td>
                    <td>Não Feito</td>
                    <td><a href="/lista/feito/${a.id}"class="w3-btn w3-green">Feito</a></td>
                    <td><a href="/lista/apagar/${a.id}" class="w3-btn w3-black">Apagar</a></td>
                </tr>
                `
                break;

            case "1":
                pagHTML += `
                <tr>
                    <td>${a.dregisto}</td>
                    <td>${a.dtermino}</td>
                    <td>${a.nome}</td>
                    <td>${a.descriTarefa}</td>
                    <td>Feito</td>
                    <td><a href="/lista/naofeito/${a.id}"class="w3-btn w3-red">Não Feito</a></td>
                    <td><a href="/lista/apagar/${a.id}" class="w3-btn w3-black">Apagar</a></td>
                </tr>
                `
                break;

            default:
              
                break;
        }
    });

    pagHTML += `</table>`

    return pagHTML
}

// Template para o formulário de aluno ------------------
function geraFormList() {
    return `
        <div class="w3-container w3-teal">
            <h5>Nova Tarefa</h5>
        </div>
        <form class="w3-container" action="/lista" method="POST">
            <label class="w3-text-teal"><b>Data de Início</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="dregisto" placeholder="aaaa/mm/dd">

            <label class="w3-text-teal"><b>Data de término</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="dtermino" placeholder="aaaa/mm/dd">
          
            <label class="w3-text-teal"><b>Nome do Responsável</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="nome">

            <label class="w3-text-teal"><b>Descrição da Tarefa</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="descriTarefa">

            <input type="hidden" name="status" value=0>
          
            <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
        </form>
    `
}

function home(res) {
    axios.get('http://localhost:3000/lista?_sort=estado')
        .then( li => {
            lista = li.data

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8', Location: 'http://localhost:8080/' })
            res.write(`<html>
                <head>
                    <title>ToDo List</title>
                    <meta charset="utf-8"/>
                    <link rel="icon" href="favicon.png"/>
                    <link rel="stylesheet" href="w3.css"/>
                </head>
                <body>
            `) //cabeça
            res.write(geraFormList())
            res.write(geraPagList(lista))
            res.write('</body></html>') //cauda
            res.end()
        })
        .catch((err) => {
            res.writeHead(203, { 'Content-Type': 'text/html;charset=utf-8', Location: 'http://localhost:8080/' })
            console.log('Erro', err)
            res.end()
        })
}

function naofeito(res, a) {
    axios.get('http://localhost:3000/lista/' + a)
        .then(resp => {
            lista = resp.data
            lista.estado = "0"

            axios.put(`http://localhost:3000/lista/${lista.id}`, lista)
                .then(resp => {
                    console.log('Desfeito ' + lista.id)
                    home(res)
                })
                .catch(error => {
                    console.log('Erro no put ' + error)
                    home(res)
                })
        })
        .catch(error => {
            console.log('Error no get do naofeito ' + error)
            home(res)
        })
}


function feito(res, a) {
    axios.get('http://localhost:3000/lista/' + a)
        .then(resp => {
            lista = resp.data
            lista.estado = "1"

            axios.put(`http://localhost:3000/lista/${lista.id}`, lista)
                .then(function() {
                    confirm.log('Feito ' + lista.id)
                    home(res)
                })
                .catch(error => {
                    console.log('Erro no put ' + error)
                    home(res)
                })
        })
        .catch(error => {
            console.log('Error no get do feito ' + error)
            home(res)
        })
}

function apagar(res, a) {
    axios.get('http://localhost:3000/lista/' + a)
        .then(resp => {
            lista = resp.data
            lista.estado = "2"

            axios.put(`http://localhost:3000/lista/${lista.id}`, lista)
                .then(respo => {
                    console.log('Apagado ' + lista.id)
                    home(res)
                })
                .catch(error => {
                    console.log('Erro no put ' + error)
                    home(res)
                })
        })
        .catch(error => {
            console.log('Error no get do apagar ' + error)
            home(res)
        })
}

// Criação do servidor
var servidortoDoList = http.createServer(function (req, res) {

    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }

    else {
        // Tratamento do pedido
        var listaUrl = req.url.split("/")
        listaUrl.shift()
        console.log(listaUrl)

        switch (req.method) {
            case "GET":
                switch (listaUrl[0]) {
                    case '':
                        home(res)
                        break

                    case 'lista':
                        if (listaUrl.length == 1){
                            home(res);
                            break
                        }

                        switch (listaUrl[1]) {
                            case 'feito':
                                feito(res, listaUrl[2])
                                break

                            case 'apagar':
                                apagar(res, listaUrl[2])
                                break

                            case 'naofeito':
                                console.log('Nao Feito')
                                naofeito(res, listaUrl[2])
                                break

                            default:
                                res.writeHead(203, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                                res.end()
                                break
                        }
                        
                        break

                    default:
                        home(res)
                        break
                }
                break

            case "POST":
                if ((req.url == "/") || (req.url == "/lista")) {
                    recuperaInfo(req, res => {
                        console.log('Post :' + JSON.stringify(res))

                        axios.post('http://localhost:3000/lista', res)
                            .then(resp => {
                                home(res)
                            })
                            .catch(erro => {
                                console.log('Erro no POST: ' + erro)
                                home(res)
                            })
                    })
                }

                else {
                    home(res)
                }

                break

            default:
                home(res)
        }
    }
})

servidortoDoList.listen(8080)
console.log('Servidor à escuta na porta 8080...')