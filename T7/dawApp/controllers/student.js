// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    
    var aux = [0,0,0,0,0,0,0,0];
    if (student.tpc1 == 'on')
        aux[0] = 1
    if (student.tpc2 == 'on')
        aux[1] = 1
    if (student.tpc3 == 'on')
        aux[2] = 1
    if (student.tpc4 == 'on')
        aux[3] = 1
    if (student.tpc5 == 'on')
        aux[4] = 1
    if (student.tpc6 == 'on')
        aux[5] = 1
    if (student.tpc7 == 'on')
        aux[6] = 1
    if (student.tpc8 == 'on')
        aux[7] = 1
    
    var newStudent = new Student(student)    
    newStudent.tpc = aux
    return newStudent.save()
}

module.exports.delete = id => {
    return Student
        .findOneAndDelete({numero: id})
        .exec()
}

module.exports.edit = student => {
    
    return Student 
        .findOneAndUpdate({numero: student.numero},{$set:{nome: student.nome, git:student.git}})
        .exec()
}

module.exports.consult = (id, callback) => {
    Student
     .findOne({numero: id})
     .exec()
     .then(data => callback(null, data))
}

