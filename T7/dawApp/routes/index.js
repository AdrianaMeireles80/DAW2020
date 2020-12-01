var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express' 
  });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', {
       list: data 
     }))
    .catch(err => res.render('error', {error: err}))
  ;
});

/* GET users id*/
//rota:http://localhost:7700/idALuno
router.get('/students/:id', function(req, res) {
	Student.lookUp(req.params.id)
	   .then(data => res.render('student',{
        Indstudent: data
      }))
	   .catch(err => res.render('error',{
        error: err
      }))

  });

/* GET registar aluno*/
//rota: http://localhost:7700/register
router.get('/register',function(req,res){
  res.render('register')

})

/*GET editar as informações de um aluno */
router.get('/students/update/:id',function(req,res) {
  Student.lookUp(req.params.id)
    .then(data => res.render('edit', { 
      edit: data
    }))
    .catch(err => res.render('error', {
      error: err
    }))
  
})

/*POST de um aluno */
//rota: http://localhost:7700/register
router.post('/register',function(req,res){
  console.log(req.body)
  
  Student.insert(req.body)
    .then(res.redirect('/students'))
    .catch(err => res.render('error', {
      error: err
    }))
})

/*PUT de um aluno */


router.post("/students/:id", function(req, res) {

  console.log('ID É ' + req.params.id)
  console.log(req.body)

  Student.edit(req.body)
       .then(data => {
          res.render('index')
       })
      //.then(res.redirect('/students'))
      .catch(err => res.render('error', {
          error: err
      }))
      res.redirect('/students') 
})

/*DELETE de um aluno */
router.post('/delete/:id',function(req,res){  

  Student.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))

    res.redirect('/students') //para redirecionar para a página dos estudantes
});



module.exports = router;
