
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historicoSchema = mongoose.Schema({

    nameStudent : {
        type: String,
        required: true
    },

    idAluno: [{
        type: Schema.ObjectId,
        ref: 'alunos'
    }],

    codigoHistorico: {
        type: Number,
        required: true,
        unique: true
    },

    historico: {
        type: String,
        require: true
    },

   /* turmaAtualizada: {
        type: Schema.ObjectId,
        ref: 'turma'
    }
*/

});

module.exports = mongoose.model('historico', historicoSchema);
