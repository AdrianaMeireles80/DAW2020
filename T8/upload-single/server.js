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
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/',function(req,res){ 
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload',function(req,res){ 
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname',(req,res)=>{
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files',upload.array('myFile',15),function(req,res){ 

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
