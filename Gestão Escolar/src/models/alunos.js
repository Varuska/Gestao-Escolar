
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const alunosSchema = mongoose.Schema({

    nameStudent : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    cpfAluno: {
        type: Number,
        required: true,
        unique: true
    },

    tutorRepresentante : {
        type: String,
        required: true
    },

    turmaNumber: [{
        type: Schema.ObjectId, 
        ref: 'turma'
    }]


});

module.exports = mongoose.model('alunos', alunosSchema);
