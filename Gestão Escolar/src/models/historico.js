
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historicoSchema = mongoose.Schema({

    nameStudent : {
        type: String,
        required: true
    },

    cpfAluno: [{
        type: Schema.ObjectId,
        ref: 'alunos'
    }],

    codigoHistorico: {
        type: Number,
        required: true,
        unique: true
    },

    turmaNumber: [{
        type: Schema.ObjectId,
        ref: 'turma'
       
    }],

    historico: {
        type: String,
        require: true
    }


});

module.exports = mongoose.model('historico', historicoSchema);
