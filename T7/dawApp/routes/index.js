var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express' 
  });
});

//GET /students
router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', {
       list: data 
     }))
    .catch(err => res.render('error', {error: err}))
  ;
});

/* GET registar aluno*/
//rota: http://localhost:7700/students/register
router.get('/students/register',function(req,res){
  res.render('register')

})

/* GET users id*/
//rota:http://localhost:7700/students/idALuno
router.get('/students/:id', function(req, res) {
	Student.lookUp(req.params.id)
	   .then(data => res.render('student',{
        Indstudent: data
      }))
	   .catch(err => res.render('error',{
        error: err
      }))

  });


/*GET editar as informações de um aluno */
//GET /students/update/:id
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
//rota: http://localhost:7700/students
router.post('/students',function(req,res){
  Student.consult(req.body.numero, function(err, student) {
    if (err) {
      next(err)
    }
    else if (student) {
      res.render('existsStu')
    }
    else {
      Student.insert(req.body)
        .then(res.redirect('/students'))
        .catch(err => res.render('error', {error: err}))
    }
  })
})

/*PUT de um aluno */
//PUT Students/:id 
router.post("/students/:id", function(req, res) {

  Student.edit(req.body)
    .then(res.redirect('/students'))
    .catch(err => res.render('error', {
          error: err
      }))
})

/*DELETE de um aluno */
router.post('/delete/:id',function(req,res){  

  Student.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))

    res.redirect('/students') //para redirecionar para a página dos estudantes
});

module.exports = router;
