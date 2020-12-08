var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var fs = require('fs')

var logger = require('morgan')

var multer = require('multer')
const { fstat } = require('fs')
var upload = multer({dest: 'uploads/'})

var app = express()
app.use(logger('dev'))// logger- so escreve a linha no fim do pedido

//TPC - PEGAR NISTO E ENVIAR MAIS DO QUE UMA OPÇÃO DE CADA VEZ
//TPC- MULTIPLOS FICHEIROS A FUNCIONAR

//coloca na pipeline de execução
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.static('public')) //tudo o que esta na pasta public passa a ser indexado como recurso estatico

app.get('/',function(req,res){ // * - qualquer rota
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload',function(req,res){ // * - qualquer rota
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname',(req,res)=>{
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files',upload.array('myFile',15),function(req,res){ 
    //req.file is the 'myFile'file
    //req.body will hold the next fields if any
    //multiple files: upload.array(...) => files is an array
    req.files.forEach(reqfile => {

        let oldPath=__dirname + '/' + reqfile.path
        let newPath=__dirname + '/public/fileStore/' + reqfile.originalname

        fs.rename(oldPath,newPath,function(err){
            if(err) throw err
        })

        var files = jsonfile.readFileSync('./dbFiles.json')
        var d = new Date().toISOString().substr(0,16)
        files.push(
            {
                date:d,
                name:reqfile.originalname,
                size:reqfile.size,
                mimetype: reqfile.mimetype,

            }
        )
        jsonfile.writeFileSync('./dbFiles.json',files)
    });    
    res.redirect('/')
})

app.listen(7703,() => console.log('Servidor à escuta na porta 7703...'))
